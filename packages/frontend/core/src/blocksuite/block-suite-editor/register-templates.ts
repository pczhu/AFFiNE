import { builtInTemplates as builtInEdgelessTemplates } from '@affine/templates/edgeless';
import { builtInTemplates as builtInStickersTemplates } from '@affine/templates/stickers';
import {
  EdgelessTemplatePanel,
  type TemplateManager,
} from '@blocksuite/affine/gfx/template';

import { createLocalizedTemplateManager } from './localized-template-manager';

const localizedStickers = createLocalizedTemplateManager(
  builtInStickersTemplates as TemplateManager
);
const localizedEdgelessTemplates = createLocalizedTemplateManager(
  builtInEdgelessTemplates as TemplateManager
);

export function registerTemplates() {
  EdgelessTemplatePanel.templates.extend(localizedStickers);
  EdgelessTemplatePanel.templates.extend(localizedEdgelessTemplates);
}
