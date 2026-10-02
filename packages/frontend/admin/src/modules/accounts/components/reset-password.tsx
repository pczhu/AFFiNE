import { Button } from '@affine/admin/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@affine/admin/components/ui/dialog';
import { Input } from '@affine/admin/components/ui/input';
import { translateUiText, useUiLanguage } from '@affine/i18n';
import { CopyIcon } from 'lucide-react';

export const ResetPasswordDialog = ({
  link,
  open,
  onCopy,
  onOpenChange,
}: {
  link: string;
  open: boolean;
  onCopy: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  useUiLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[460px]">
        <DialogHeader>
          <DialogTitle className="leading-7">
            {translateUiText('Account Recovery Link')}
          </DialogTitle>
          <DialogDescription className="leading-6">
            {translateUiText(
              'Please send this recovery link to the user and instruct them to\n            complete it.\n          '
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <div className="flex justify-end gap-2 items-center w-full">
            <Input
              type="text"
              value={link}
              placeholder={translateUiText('Please type email to confirm')}
              className="placeholder:opacity-50 text-ellipsis overflow-hidden whitespace-nowrap"
              readOnly
            />
            <Button type="button" onClick={onCopy} className="space-x-[10px]">
              <CopyIcon size={20} />{' '}
              <span>{translateUiText('Copy and Close')}</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
