import { editorText } from '@blocksuite/affine-shared/utils';
import { SeniorToolExtension } from '@blocksuite/affine-widget-edgeless-toolbar';
import { html } from 'lit';

export const noteSeniorTool = SeniorToolExtension('note', ({ block }) => {
  return {
    get name() {
      return editorText('Note');
    },
    content: html`<edgeless-note-senior-button
      .edgeless=${block}
    ></edgeless-note-senior-button>`,
  };
});
