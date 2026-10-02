import { editorText } from '@blocksuite/affine-shared/utils';

import type { SlashMenuTooltip } from '../types';
import { CopyTooltip } from './copy';
import { DeleteTooltip } from './delete';
import { MoveDownTooltip } from './move-down';
import { MoveUpTooltip } from './move-up';
import { NowTooltip } from './now';
import { TodayTooltip } from './today';
import { TomorrowTooltip } from './tomorrow';
import { YesterdayTooltip } from './yesterday';

export const slashMenuToolTips: Record<string, SlashMenuTooltip> = {
  Today: {
    get figure() {
      return TodayTooltip();
    },
    get caption() {
      return editorText('Today');
    },
  },

  Tomorrow: {
    get figure() {
      return TomorrowTooltip();
    },
    get caption() {
      return editorText('Tomorrow');
    },
  },

  Yesterday: {
    get figure() {
      return YesterdayTooltip();
    },
    get caption() {
      return editorText('Yesterday');
    },
  },

  Now: {
    get figure() {
      return NowTooltip();
    },
    get caption() {
      return editorText('Now');
    },
  },

  'Move Up': {
    get figure() {
      return MoveUpTooltip();
    },
    get caption() {
      return editorText('Move Up');
    },
  },

  'Move Down': {
    get figure() {
      return MoveDownTooltip();
    },
    get caption() {
      return editorText('Move Down');
    },
  },

  Copy: {
    get figure() {
      return CopyTooltip();
    },
    get caption() {
      return editorText('Copy / Duplicate');
    },
  },

  Delete: {
    get figure() {
      return DeleteTooltip();
    },
    get caption() {
      return editorText('Delete');
    },
  },
};
