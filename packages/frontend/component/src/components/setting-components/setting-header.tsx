import { translateUiText, useUiLanguage } from '@affine/i18n';
import type { HTMLAttributes, ReactNode } from 'react';

import { settingHeader, settingHeaderBeta } from './share.css';

interface SettingHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: ReactNode;
  subtitle?: ReactNode;
  beta?: boolean;
}

export const SettingHeader = ({
  title,
  subtitle,
  beta,
  ...otherProps
}: SettingHeaderProps) => {
  useUiLanguage();
  return (
    <div className={settingHeader} {...otherProps}>
      <div className="title">
        {title}
        {beta ? (
          <div className={settingHeaderBeta}>{translateUiText('Beta')}</div>
        ) : null}
      </div>
      {subtitle ? <div className="subtitle">{subtitle}</div> : null}
    </div>
  );
};
