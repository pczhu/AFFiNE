import { getSelectedModelsCommand } from '@blocksuite/affine-shared/commands';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import {
  editorText,
  isInsideBlockByFlavour,
} from '@blocksuite/affine-shared/utils';
import type { SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { TableIcon } from '@blocksuite/icons/lit';

import { insertTableBlockCommand } from '../commands';
import { tableTooltip } from './tooltips';

export const tableSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => model.flavour === 'affine:table',
  items: [
    {
      name: 'Table',
      get description() {
        return editorText('Create a simple table.');
      },
      icon: TableIcon(),
      tooltip: {
        get figure() {
          return tableTooltip();
        },
        get caption() {
          return editorText('Table');
        },
      },
      group: '4_Content & Media@0',
      when: ({ model }) =>
        !isInsideBlockByFlavour(model.store, model, 'affine:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertTableBlockCommand, {
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedTableBlockId }) => {
            if (insertedTableBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'affine:table',
              });
            }
          })
          .run();
      },
    },
  ],
};
