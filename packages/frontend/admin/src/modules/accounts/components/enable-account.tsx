import { translateUiText, useUiLanguage } from '@affine/i18n';

import { ConfirmDialog } from '../../../components/shared/confirm-dialog';

export const EnableAccountDialog = ({
  open,
  email,
  onClose,
  onConfirm,
  onOpenChange,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  useUiLanguage();
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translateUiText('Enable Account')}
      description={
        <>
          {translateUiText(
            'Are you sure you want to enable the account? After enabling the\n          account, the '
          )}
          <span className="font-bold">{email}</span>{' '}
          {translateUiText('email can be\n          used to log in.\n        ')}
        </>
      }
      confirmText={translateUiText('Enable')}
      confirmButtonVariant="default"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};
