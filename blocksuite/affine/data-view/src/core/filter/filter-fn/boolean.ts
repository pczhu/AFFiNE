import { editorText } from '@blocksuite/affine-shared/utils';

import { t } from '../../logical/type-presets.js';
import { createFilter } from './create.js';

export const booleanFilter = [
  createFilter({
    name: 'isChecked',
    self: t.boolean.instance(),
    args: [],
    get label() {
      return editorText('Is checked');
    },
    shortString: () => ': Checked',
    impl: value => {
      return !!value;
    },
    defaultValue: () => true,
  }),
  createFilter({
    name: 'isUnchecked',
    self: t.boolean.instance(),
    args: [],
    get label() {
      return editorText('Is unchecked');
    },
    shortString: () => ': Unchecked',
    impl: value => {
      return !value;
    },
    defaultValue: () => false,
  }),
];
