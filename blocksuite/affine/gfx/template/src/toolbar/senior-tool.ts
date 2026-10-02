import { editorText } from '@blocksuite/affine-shared/utils';
import { SeniorToolExtension } from '@blocksuite/affine-widget-edgeless-toolbar';
import { html } from 'lit';

export const templateSeniorTool = SeniorToolExtension(
  'template',
  ({ block }) => {
    return {
      get name() {
        return editorText('Template');
      },
      content: html`<edgeless-template-button .edgeless=${block}>
      </edgeless-template-button>`,
    };
  }
);
