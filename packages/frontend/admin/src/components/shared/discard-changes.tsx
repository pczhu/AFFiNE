import { translateUiText, useUiLanguage } from '@affine/i18n';

import { ConfirmDialog } from './confirm-dialog';

export const DiscardChanges = ({
  open,
  onClose,
  onConfirm,
  onOpenChange,
  description = translateUiText('Changes will not be saved.'),
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  description?: string;
}) => {
  useUiLanguage();
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translateUiText('Discard Changes')}
      description={description}
      confirmText={translateUiText('Discard')}
      confirmButtonVariant="destructive"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};
