import './global.css';
import './setup';

import {
  getOrCreateI18n,
  type Language,
  SUPPORTED_LANGUAGES,
} from '@affine/i18n';
import { createRoot } from 'react-dom/client';

import { App } from './app';

// oxlint-disable-next-line typescript/no-non-null-assertion
const root = createRoot(document.getElementById('app')!);
const i18n = getOrCreateI18n();

function applyLanguage(value: unknown) {
  const language =
    typeof value === 'string' && value in SUPPORTED_LANGUAGES
      ? (value as Language)
      : 'en';
  return i18n.changeLanguage(language).then(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = SUPPORTED_LANGUAGES[language].rtl
      ? 'rtl'
      : 'ltr';
    root.render(<App />);
  });
}

// 管理后台与主应用使用同一份语言设置。
let language: unknown = 'en';
try {
  language = JSON.parse(
    localStorage.getItem('global-cache:i18n_lng') ?? '"en"'
  );
} catch {
  // 无效的缓存不妨碍管理后台启动。
}
applyLanguage(language).catch(() => root.render(<App />));

const languageChannel = new BroadcastChannel('global-cache:');
languageChannel.addEventListener('message', event => {
  if (event.data?.key === 'i18n_lng') {
    applyLanguage(event.data.value).catch(() => {});
  }
});
