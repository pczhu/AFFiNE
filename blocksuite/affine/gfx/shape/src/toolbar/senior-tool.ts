import { editorText } from '@blocksuite/affine-shared/utils';
import { SeniorToolExtension } from '@blocksuite/affine-widget-edgeless-toolbar';
import { html } from 'lit';

export const shapeSeniorTool = SeniorToolExtension(
  'shape',
  ({ block, toolbarContainer }) => {
    return {
      get name() {
        return editorText('Shape');
      },
      content: html`<edgeless-shape-tool-button
        .edgeless=${block}
        .toolbarContainer=${toolbarContainer}
      ></edgeless-shape-tool-button>`,
    };
  }
);
