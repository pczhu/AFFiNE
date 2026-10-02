import { translateUiText, useUiLanguage } from '@affine/i18n';

import { TypeConfirmDialog } from '../../../components/shared/type-confirm-dialog';

export const DisableAccountDialog = ({
  email,
  open,
  onClose,
  onDisable,
  onOpenChange,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
  onDisable: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  useUiLanguage();
  return (
    <TypeConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translateUiText('Disable Account ?')}
      description={
        <>
          {translateUiText('The data associated with ')}
          <span className="font-bold">{email}</span>{' '}
          {translateUiText(
            'will be deleted and cannot be used for logging in. This operation is\n          irreversible. Please proceed with caution.\n        '
          )}
        </>
      }
      targetText={email}
      inputPlaceholder={translateUiText('Please type email to confirm')}
      confirmText={translateUiText('Disable')}
      confirmButtonVariant="destructive"
      onConfirm={onDisable}
      onClose={onClose}
    />
  );
};
