import {
  menu,
  popFilterableSimpleMenu,
  type PopupTarget,
} from '@blocksuite/affine-components/context-menu';
import { editorText } from '@blocksuite/affine-shared/utils';
import { DeleteIcon, ExpandFullIcon } from '@blocksuite/icons/lit';

import type { SingleView } from '../../../core/index.js';
import type { MobileTableViewUILogic } from './table-view-ui-logic.js';

export const popMobileRowMenu = (
  target: PopupTarget,
  rowId: string,
  tableViewLogic: MobileTableViewUILogic,
  view: SingleView
) => {
  popFilterableSimpleMenu(target, [
    menu.group({
      items: [
        menu.action({
          get name() {
            return editorText('Expand Row');
          },
          prefix: ExpandFullIcon(),
          select: () => {
            tableViewLogic.root.openDetailPanel({
              view: view,
              rowId: rowId,
            });
          },
        }),
      ],
    }),
    menu.group({
      name: '',
      items: [
        menu.action({
          get name() {
            return editorText('Delete Row');
          },
          class: { 'delete-item': true },
          prefix: DeleteIcon(),
          select: () => {
            view.rowsDelete([rowId]);
            tableViewLogic.ui$.value?.requestUpdate();
          },
        }),
      ],
    }),
  ]);
};
