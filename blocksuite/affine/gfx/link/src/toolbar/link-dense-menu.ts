import { insertLinkByQuickSearchCommand } from '@blocksuite/affine-block-bookmark';
import { menu } from '@blocksuite/affine-components/context-menu';
import { LinkIcon } from '@blocksuite/affine-components/icons';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { editorText } from '@blocksuite/affine-shared/utils';
import type { DenseMenuBuilder } from '@blocksuite/affine-widget-edgeless-toolbar';

export const buildLinkDenseMenu: DenseMenuBuilder = edgeless =>
  menu.action({
    get name() {
      return editorText('Link');
    },
    prefix: LinkIcon,
    select: () => {
      const [_, { insertedLinkType }] = edgeless.std.command.exec(
        insertLinkByQuickSearchCommand
      );

      insertedLinkType
        ?.then(type => {
          const flavour = type?.flavour;
          if (!flavour) return;

          edgeless.std
            .getOptional(TelemetryProvider)
            ?.track('CanvasElementAdded', {
              control: 'toolbar:general',
              page: 'whiteboard editor',
              module: 'toolbar',
              type: flavour.split(':')[1],
            });
        })
        .catch(console.error);
    },
  });
