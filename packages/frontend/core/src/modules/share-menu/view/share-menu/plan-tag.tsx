import { translateUiText, useUiLanguage } from '@affine/i18n';

import { containerStyle } from './plan-tag.css';

export const PlanTag = () => {
  useUiLanguage();
  return <div className={containerStyle}>{translateUiText('Pro')}</div>;
};
