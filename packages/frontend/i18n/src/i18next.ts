import { DebugLogger } from '@affine/debug';
import type { BackendModule, i18n } from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { useAFFiNEI18N } from './i18n.gen';
import type { Language } from './resources';
import { SUPPORTED_LANGUAGES } from './resources';

const logger = new DebugLogger('i18n');

const defaultLng: Language = 'en';

let _instance: i18n | null = null;
export const getOrCreateI18n = (): i18n => {
  if (!_instance) {
    _instance = i18next.createInstance();
    _instance
      .use(initReactI18next)
      .use({
        type: 'backend',
        init: () => {},
        read: (lng: Language, _ns: string, callback) => {
          const resource = SUPPORTED_LANGUAGES[lng].resource;
          if (typeof resource === 'function') {
            resource()
              .then(data => {
                logger.info(`Loaded i18n ${lng} resource`);
                callback(null, data.default);
              })
              .catch(err => {
                logger.error(`Failed to load i18n ${lng} resource`, err);
                callback(null, null);
              });
          } else {
            callback(null, resource);
          }
        },
      } as BackendModule)
      .init({
        lng: defaultLng,
        fallbackLng: code => {
          // always fallback to english
          const fallbacks: string[] = [defaultLng];
          const langPart = code.split('-')[0];

          // fallback xx-YY to xx, e.g. es-AR to es
          // fallback zh-Hant to zh-Hans
          if (langPart === 'cn') {
            fallbacks.push('zh-Hans');
          } else if (
            langPart !== code &&
            SUPPORTED_LANGUAGES[code as Language]
          ) {
            fallbacks.unshift(langPart);
          }

          return fallbacks;
        },
        supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
        debug: false,
        partialBundledLanguages: true,
        resources: {
          [defaultLng]: {
            translation: SUPPORTED_LANGUAGES[defaultLng].resource,
          },
        },
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
      })
      .then(() => {
        logger.info('i18n initialized');
      })
      .catch(() => {});
  }

  return _instance;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    // NOTE(@forehalo):
    //   DO NOT ENABLE THIS
    //   This could bring typecheck for <Trans /> component,
    //   but it will make typecheck of whole codebase so laggy!
    //   check [./react.ts]
    // resources: {
    //   translation: LanguageResource;
    // };
  }
}

export type I18nFuncs = ReturnType<typeof useAFFiNEI18N>;
type KnownI18nKey = keyof I18nFuncs;

export type I18nString =
  | KnownI18nKey
  | string
  | { i18nKey: string; options?: Record<string, any> };

export function isI18nString(value: unknown): value is I18nString {
  if (typeof value === 'string') {
    return true;
  }

  if (typeof value === 'object' && value !== null) {
    return 'i18nKey' in value;
  }

  return false;
}

export function createI18nWrapper(getI18nFn: () => i18n, language?: string) {
  const I18nMethod = {
    t(key: I18nString, options?: Record<string, any>) {
      if (typeof key === 'object' && 'i18nKey' in key) {
        options = key.options;
        key = key.i18nKey as string;
      }

      const i18n = getI18nFn();
      if (i18n.exists(key, { lng: language })) {
        return i18n.t(key, { lng: language, ...options });
      } else {
        // unknown translate key 'xxx.xxx' returns itself
        return key;
      }
    },
    get language() {
      const i18n = getI18nFn();
      return language ?? i18n.language;
    },
    uiText(text: string) {
      return translateUiText(text, language);
    },
    changeLanguage(lng?: string | undefined) {
      const i18n = getI18nFn();
      return i18n.changeLanguage(lng);
    },
    get on() {
      const i18n = getI18nFn();
      return i18n.on.bind(i18n);
    },
  };

  return new Proxy(I18nMethod, {
    get(self, key: string) {
      if (key in self) {
        // @ts-expect-error allow
        return self[key];
      }

      return I18nMethod.t.bind(null, key);
    },
    has(self, key: string) {
      if (key in self) {
        return true;
      }
      const i18n = getI18nFn();
      if (i18n.exists(key)) {
        return true;
      }
      return false;
    },
  }) as typeof I18nMethod &
    ReturnType<typeof useAFFiNEI18N> & { [unknownKey: string]: () => string };
}

/**
 * I18n['com.affine.xxx']({ arg1: 'hello' }) -> '中文 hello'
 */
export const I18n = createI18nWrapper(getOrCreateI18n);
export type I18nInstance = typeof I18n;

/** 固定界面文案使用完整词条查找，句号不作为词条的层级分隔符。 */
export function translateUiText(text: string, language?: string): string {
  const key = text.replace(/\s+/g, ' ').trim();
  const i18n = getOrCreateI18n();
  if (
    !i18n.exists(key, {
      keySeparator: false,
      nsSeparator: false,
      lng: language,
    })
  ) {
    return text;
  }
  const translated = i18n.t(key, {
    keySeparator: false,
    nsSeparator: false,
    lng: language,
  });
  if (translated === key) {
    return text;
  }
  return text.replace(text.trim(), translated);
}
