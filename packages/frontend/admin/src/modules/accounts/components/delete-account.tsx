import { translateUiText, useUiLanguage } from '@affine/i18n';

import { TypeConfirmDialog } from '../../../components/shared/type-confirm-dialog';

export const DeleteAccountDialog = ({
  email,
  open,
  onClose,
  onDelete,
  onOpenChange,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  useUiLanguage();
  return (
    <TypeConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translateUiText('Delete Account ?')}
      description={
        <>
          <span className="font-bold">{email}</span>{' '}
          {translateUiText(
            'will be permanently\n          deleted. This operation is irreversible. Please proceed with caution.\n        '
          )}
        </>
      }
      targetText={email}
      inputPlaceholder={translateUiText('Please type email to confirm')}
      confirmText={translateUiText('Delete')}
      confirmButtonVariant="destructive"
      onConfirm={onDelete}
      onClose={onClose}
    />
  );
};
