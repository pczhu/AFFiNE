import { NotificationProvider } from '@blocksuite/affine-shared/services';
import { editorText } from '@blocksuite/affine-shared/utils';
import { type BlockStdScope } from '@blocksuite/std';

import { toast } from '../toast/toast.js';

function notify(std: BlockStdScope, title: string, message: string) {
  const notification = std.getOptional(NotificationProvider);
  const { host } = std;

  if (!notification) {
    toast(host, title);
    return;
  }

  notification.notifyWithUndoAction({
    title,
    message,
    accent: 'info',
    duration: 10 * 1000,
  });
}

export function notifyLinkedDocSwitchedToCard(std: BlockStdScope) {
  notify(
    std,
    editorText('View Updated'),
    editorText(
      'The alias modification has disabled sync. The embed has been updated to a card view.'
    )
  );
}

export function notifyLinkedDocSwitchedToEmbed(std: BlockStdScope) {
  notify(
    std,
    editorText('Embed View Restored'),
    editorText(
      'Custom alias removed. The linked doc now displays the original title and description.'
    )
  );
}

export function notifyLinkedDocClearedAliases(std: BlockStdScope) {
  notify(
    std,
    editorText('Reset successful'),
    editorText(
      'Card view has been restored to original doc title and description. All custom aliases have been removed.'
    )
  );
}
