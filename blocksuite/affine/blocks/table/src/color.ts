import { cssVarV2 } from '@blocksuite/affine-shared/theme';
import { editorText } from '@blocksuite/affine-shared/utils';
type Color = {
  name: string;
  color: string;
};
export const colorList: Color[] = [
  {
    get name() {
      return editorText('Blue');
    },
    color: cssVarV2.table.headerBackground.blue,
  },
  {
    get name() {
      return editorText('Green');
    },
    color: cssVarV2.table.headerBackground.green,
  },
  {
    get name() {
      return editorText('Grey');
    },
    color: cssVarV2.table.headerBackground.grey,
  },
  {
    get name() {
      return editorText('Orange');
    },
    color: cssVarV2.table.headerBackground.orange,
  },
  {
    get name() {
      return editorText('Purple');
    },
    color: cssVarV2.table.headerBackground.purple,
  },
  {
    get name() {
      return editorText('Red');
    },
    color: cssVarV2.table.headerBackground.red,
  },
  {
    get name() {
      return editorText('Teal');
    },
    color: cssVarV2.table.headerBackground.teal,
  },
  {
    get name() {
      return editorText('Yellow');
    },
    color: cssVarV2.table.headerBackground.yellow,
  },
];

const colorMap = Object.fromEntries(colorList.map(item => [item.color, item]));

export const getColorByColor = (color: string): Color | undefined => {
  return colorMap[color] ?? undefined;
};
