import { Input } from '@affine/component';
import type { ConfirmModalProps } from '@affine/component/ui/modal';
import { ConfirmModal } from '@affine/component/ui/modal';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import type { WorkspaceMetadata } from '@affine/core/modules/workspace';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { Trans, translateUiText, useI18n } from '@affine/i18n';
import { useCallback, useState } from 'react';

import * as styles from './style.css';

interface WorkspaceDeleteProps extends ConfirmModalProps {
  workspaceMetadata: WorkspaceMetadata;
  onConfirm?: () => void;
}

export const WorkspaceDeleteModal = ({
  workspaceMetadata,
  ...props
}: WorkspaceDeleteProps) => {
  const { onConfirm } = props;
  const [deleteStr, setDeleteStr] = useState<string>('');
  const info = useWorkspaceInfo(workspaceMetadata);
  const workspaceName = info?.name ?? UNTITLED_WORKSPACE_NAME;
  const allowDelete = deleteStr === workspaceName;
  const t = useI18n();

  const handleOnEnter = useCallback(() => {
    if (allowDelete) {
      return onConfirm?.();
    }
  }, [allowDelete, onConfirm]);

  return (
    <ConfirmModal
      title={`${t['com.affine.workspaceDelete.title']()}?`}
      cancelText={t['com.affine.workspaceDelete.button.cancel']()}
      confirmText={t['com.affine.workspaceDelete.button.delete']()}
      confirmButtonOptions={{
        variant: 'error',
        disabled: !allowDelete,
        'data-testid': 'delete-workspace-confirm-button',
      }}
      {...props}
    >
      {workspaceMetadata.flavour === 'local' ? (
        <Trans i18nKey="com.affine.workspaceDelete.description">
          {translateUiText('Deleting (\n          ')}
          <span className={styles.workspaceName}>
            {{ workspace: workspaceName } as any}
          </span>
          {translateUiText(
            ') cannot be undone, please proceed with caution. All contents will be\n          lost.\n        '
          )}
        </Trans>
      ) : (
        <Trans i18nKey="com.affine.workspaceDelete.description2">
          {translateUiText('Deleting (\n          ')}
          <span className={styles.workspaceName}>
            {{ workspace: workspaceName } as any}
          </span>
          {translateUiText(
            ') will delete both local and cloud data, this operation cannot be\n          undone, please proceed with caution.\n        '
          )}
        </Trans>
      )}
      <div className={styles.inputContent}>
        <Input
          autoFocus
          onChange={setDeleteStr}
          data-testid="delete-workspace-input"
          onEnter={handleOnEnter}
          placeholder={t['com.affine.workspaceDelete.placeholder']()}
          size="large"
        />
      </div>
    </ConfirmModal>
  );
};
