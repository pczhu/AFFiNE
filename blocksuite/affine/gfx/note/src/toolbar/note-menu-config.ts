import {
  BulletedListIcon,
  CheckBoxIcon,
  CodeBlockIcon,
  DividerIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  NumberedListIcon,
  QuoteIcon,
  TextIcon,
} from '@blocksuite/affine-components/icons';
import type { NoteChildrenFlavour } from '@blocksuite/affine-shared/types';
import { editorText } from '@blocksuite/affine-shared/utils';
import type { TemplateResult } from 'lit';

export const BUTTON_GROUP_LENGTH = 10;

export type NoteMenuItem = {
  icon: TemplateResult<1>;
  tooltip: string;
  childFlavour: NoteChildrenFlavour;
  childType: string | null;
};

const LIST_ITEMS = [
  {
    flavour: 'affine:list',
    type: 'bulleted',
    get name() {
      return editorText('Bulleted List');
    },
    get description() {
      return editorText('A simple bulleted list.');
    },
    icon: BulletedListIcon,
    get tooltip() {
      return editorText('Drag/Click to insert Bulleted List');
    },
  },
  {
    flavour: 'affine:list',
    type: 'numbered',
    get name() {
      return editorText('Numbered List');
    },
    get description() {
      return editorText('A list with numbering.');
    },
    icon: NumberedListIcon,
    get tooltip() {
      return editorText('Drag/Click to insert Numbered List');
    },
  },
  {
    flavour: 'affine:list',
    type: 'todo',
    get name() {
      return editorText('To-do List');
    },
    get description() {
      return editorText('Track tasks with a to-do list.');
    },
    icon: CheckBoxIcon,
    get tooltip() {
      return editorText('Drag/Click to insert To-do List');
    },
  },
];

const TEXT_ITEMS = [
  {
    flavour: 'affine:paragraph',
    type: 'text',
    get name() {
      return editorText('Text');
    },
    get description() {
      return editorText('Start typing with plain text.');
    },
    icon: TextIcon,
    get tooltip() {
      return editorText('Drag/Click to insert Text block');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h1',
    get name() {
      return editorText('Heading 1');
    },
    get description() {
      return editorText('Headings in the largest font.');
    },
    icon: Heading1Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 1');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h2',
    get name() {
      return editorText('Heading 2');
    },
    get description() {
      return editorText('Headings in the 2nd font size.');
    },
    icon: Heading2Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 2');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h3',
    get name() {
      return editorText('Heading 3');
    },
    get description() {
      return editorText('Headings in the 3rd font size.');
    },
    icon: Heading3Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 3');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h4',
    get name() {
      return editorText('Heading 4');
    },
    get description() {
      return editorText('Heading in the 4th font size.');
    },
    icon: Heading4Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 4');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h5',
    get name() {
      return editorText('Heading 5');
    },
    get description() {
      return editorText('Heading in the 5th font size.');
    },
    icon: Heading5Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 5');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'h6',
    get name() {
      return editorText('Heading 6');
    },
    get description() {
      return editorText('Heading in the 6th font size.');
    },
    icon: Heading6Icon,
    get tooltip() {
      return editorText('Drag/Click to insert Heading 6');
    },
  },
  {
    flavour: 'affine:code',
    type: 'code',
    get name() {
      return editorText('Code Block');
    },
    get description() {
      return editorText('Capture a code snippet.');
    },
    icon: CodeBlockIcon,
    get tooltip() {
      return editorText('Drag/Click to insert Code Block');
    },
  },
  {
    flavour: 'affine:paragraph',
    type: 'quote',
    get name() {
      return editorText('Quote');
    },
    get description() {
      return editorText('Capture a quote.');
    },
    icon: QuoteIcon,
    get tooltip() {
      return editorText('Drag/Click to insert Quote');
    },
  },
  {
    flavour: 'affine:divider',
    type: null,
    get name() {
      return editorText('Divider');
    },
    get description() {
      return editorText('A visual divider.');
    },
    icon: DividerIcon,
    get tooltip() {
      return editorText('A visual divider');
    },
  },
];

// TODO: add image, bookmark, database blocks
export const NOTE_MENU_ITEMS = TEXT_ITEMS.concat(LIST_ITEMS)
  .filter(item => item.flavour !== 'affine:divider')
  .map(item => {
    return {
      icon: item.icon,
      get tooltip() {
        return item.type !== 'text' ? item.name : editorText('Text');
      },
      childFlavour: item.flavour as NoteChildrenFlavour,
      childType: item.type,
    } as NoteMenuItem;
  });
