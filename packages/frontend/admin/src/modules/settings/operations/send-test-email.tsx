import { Button } from '@affine/admin/components/ui/button';
import { useMutation } from '@affine/admin/use-mutation';
import { notify } from '@affine/component';
import type { UserFriendlyError } from '@affine/error';
import { sendTestEmailMutation } from '@affine/graphql';
import { translateUiText, useUiLanguage } from '@affine/i18n';
import { useCallback } from 'react';

import type { AppConfig } from '../config';

export function SendTestEmail({ appConfig }: { appConfig: AppConfig }) {
  useUiLanguage();
  const { trigger } = useMutation({
    mutation: sendTestEmailMutation,
  });

  const onClick = useCallback(() => {
    trigger(appConfig.mailer.SMTP)
      .then(() => {
        notify.success({
          get title() {
            return translateUiText('Test email sent');
          },
          get message() {
            return translateUiText(
              'The test email has been successfully sent.'
            );
          },
        });
      })
      .catch((err: UserFriendlyError) => {
        notify.error({
          get title() {
            return translateUiText('Failed to send test email');
          },
          message: err.message,
        });
      });
  }, [appConfig, trigger]);

  return (
    <Button onClick={onClick}>{translateUiText('Send Test Email')}</Button>
  );
}
