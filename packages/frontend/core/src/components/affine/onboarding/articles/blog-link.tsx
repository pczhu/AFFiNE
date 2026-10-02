import { useI18n } from '@affine/i18n';

import { link } from './blocks.css';

export const BlogLink = () => {
  const t = useI18n();
  return (
    <a className={link} href="https://affine.pro/blog">
      {t.uiText('Check other articles')}
    </a>
  );
};
