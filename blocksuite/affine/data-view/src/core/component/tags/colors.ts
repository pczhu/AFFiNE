import { editorText } from '@blocksuite/affine-shared/utils';
import { cssVarV2 } from '@toeverything/theme/v2';

export type SelectOptionColor = {
  oldColor: string;
  color: string;
  name: string;
};
export const selectOptionColors: SelectOptionColor[] = [
  {
    oldColor: 'var(--affine-tag-red)',
    color: cssVarV2('chip/label/red'),
    get name() {
      return editorText('Red');
    },
  },
  {
    oldColor: 'var(--affine-tag-pink)',
    color: cssVarV2('chip/label/magenta'),
    get name() {
      return editorText('Magenta');
    },
  },
  {
    oldColor: 'var(--affine-tag-orange)',
    color: cssVarV2('chip/label/orange'),
    get name() {
      return editorText('Orange');
    },
  },
  {
    oldColor: 'var(--affine-tag-yellow)',
    color: cssVarV2('chip/label/yellow'),
    get name() {
      return editorText('Yellow');
    },
  },
  {
    oldColor: 'var(--affine-tag-green)',
    color: cssVarV2('chip/label/green'),
    get name() {
      return editorText('Green');
    },
  },
  {
    oldColor: 'var(--affine-tag-teal)',
    color: cssVarV2('chip/label/teal'),
    get name() {
      return editorText('Teal');
    },
  },
  {
    oldColor: 'var(--affine-tag-blue)',
    color: cssVarV2('chip/label/blue'),
    get name() {
      return editorText('Blue');
    },
  },
  {
    oldColor: 'var(--affine-tag-purple)',
    color: cssVarV2('chip/label/purple'),
    get name() {
      return editorText('Purple');
    },
  },
  {
    oldColor: 'var(--affine-tag-gray)',
    color: cssVarV2('chip/label/grey'),
    get name() {
      return editorText('Grey');
    },
  },
  {
    oldColor: 'var(--affine-tag-white)',
    color: cssVarV2('chip/label/white'),
    get name() {
      return editorText('White');
    },
  },
];

const oldColorMap = Object.fromEntries(
  selectOptionColors.map(tag => [tag.oldColor, tag.color])
);

export const getColorByColor = (color: string) => {
  if (color.startsWith('--affine-tag')) {
    return oldColorMap[color] ?? color;
  }
  return color;
};

/** select tag color poll */
const selectTagColorPoll = selectOptionColors.map(color => color.color);

function tagColorHelper() {
  let colors = [...selectTagColorPoll];
  return (): string => {
    if (colors.length === 0) {
      colors = [...selectTagColorPoll];
    }
    const index = Math.floor(Math.random() * colors.length);
    const color = colors.splice(index, 1)[0];
    if (!color) return '';
    return color;
  };
}

export const getTagColor = tagColorHelper();
