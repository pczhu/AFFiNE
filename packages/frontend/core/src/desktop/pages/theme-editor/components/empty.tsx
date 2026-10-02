import { Empty } from '@affine/component';
import { translateUiText, useUiLanguage } from '@affine/i18n';

export const ThemeEmpty = () => {
  useUiLanguage();
  return (
    <div
      style={{ width: 0, flex: 1, display: 'flex', justifyContent: 'center' }}
    >
      <Empty description={translateUiText('Select a variable to edit')} />
    </div>
  );
};
