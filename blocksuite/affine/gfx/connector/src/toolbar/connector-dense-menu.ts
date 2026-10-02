import { menu } from '@blocksuite/affine-components/context-menu';
import { ConnectorMode } from '@blocksuite/affine-model';
import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { editorText } from '@blocksuite/affine-shared/utils';
import type { DenseMenuBuilder } from '@blocksuite/affine-widget-edgeless-toolbar';
import {
  ConnectorCIcon,
  ConnectorEIcon,
  ConnectorLIcon,
} from '@blocksuite/icons/lit';

import { ConnectorTool } from '../connector-tool';

export const buildConnectorDenseMenu: DenseMenuBuilder = (edgeless, gfx) => {
  const prevMode =
    edgeless.std.get(EditPropsStore).lastProps$.value.connector.mode;

  const isSelected = gfx.tool.currentToolName$.peek() === 'connector';

  const createSelect =
    (mode: ConnectorMode, record = true) =>
    () => {
      gfx.tool.setTool(ConnectorTool, {
        mode,
      });
      record &&
        edgeless.std.get(EditPropsStore).recordLastProps('connector', { mode });
    };

  const iconSize = { width: '20', height: '20' };
  return menu.subMenu({
    get name() {
      return editorText('Connector');
    },
    prefix: ConnectorCIcon(iconSize),
    select: createSelect(prevMode, false),
    isSelected,
    options: {
      items: [
        menu.action({
          get name() {
            return editorText('Curve');
          },
          prefix: ConnectorCIcon(iconSize),
          select: createSelect(ConnectorMode.Curve),
          isSelected: isSelected && prevMode === ConnectorMode.Curve,
        }),
        menu.action({
          get name() {
            return editorText('Elbowed');
          },
          prefix: ConnectorEIcon(iconSize),
          select: createSelect(ConnectorMode.Orthogonal),
          isSelected: isSelected && prevMode === ConnectorMode.Orthogonal,
        }),
        menu.action({
          get name() {
            return editorText('Straight');
          },
          prefix: ConnectorLIcon(iconSize),
          select: createSelect(ConnectorMode.Straight),
          isSelected: isSelected && prevMode === ConnectorMode.Straight,
        }),
      ],
    },
  });
};
