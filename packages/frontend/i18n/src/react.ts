import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { createI18nWrapper } from './i18next';

/** 让补充的界面文案随语言切换重新渲染。 */
export const useUiLanguage = () => {
  useTranslation('translation');
};

export const useI18n = () => {
  const { i18n } = useTranslation('translation');
  const language = i18n.language;

  return useMemo(
    () => createI18nWrapper(() => i18n, language),
    [i18n, language]
  );
};

export { I18nextProvider, Trans, useTranslation } from 'react-i18next';
