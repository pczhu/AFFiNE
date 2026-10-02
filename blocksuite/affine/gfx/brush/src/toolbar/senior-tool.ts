import { editorText } from '@blocksuite/affine-shared/utils';
import { SeniorToolExtension } from '@blocksuite/affine-widget-edgeless-toolbar';
import { html } from 'lit';

export const penSeniorTool = SeniorToolExtension('pen', ({ block }) => {
  return {
    get name() {
      return editorText('Pen');
    },
    content: html`<div class="pen-and-eraser">
      <edgeless-pen-tool-button .edgeless=${block}></edgeless-pen-tool-button>

      <edgeless-eraser-tool-button
        .edgeless=${block}
      ></edgeless-eraser-tool-button>
    </div> `,
  };
});
