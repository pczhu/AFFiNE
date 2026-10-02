import { translateUiText, useUiLanguage } from '@affine/i18n';
import { ROUTES } from '@affine/routes';
import { SettingsIcon } from '@blocksuite/icons/rc';

import { NavItem } from './nav-item';

export const SettingsItem = ({ isCollapsed }: { isCollapsed: boolean }) => {
  useUiLanguage();
  return (
    <NavItem
      to={ROUTES.admin.settings.index}
      icon={<SettingsIcon fontSize={20} />}
      label={translateUiText('Settings')}
      isCollapsed={isCollapsed}
    />
  );
};
