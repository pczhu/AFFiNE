import { editorText } from '@blocksuite/affine-shared/utils';

import { t } from '../../logical/type-presets.js';
import { createFilter } from './create.js';

export const stringFilter = [
  createFilter({
    name: 'contains',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Contains');
    },
    shortString: v => (v ? `: ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().includes(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'doesNoContains',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Does no contains');
    },
    shortString: v => (v ? `: Not ${v.value}` : undefined),
    impl: (self = '', value) => {
      return !self.toLowerCase().includes(value.toLowerCase());
    },
  }),
  createFilter({
    name: 'startsWith',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Starts with');
    },
    shortString: v => (v ? `: Starts with ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().startsWith(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'endsWith',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Ends with');
    },
    shortString: v => (v ? `: Ends with ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().endsWith(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'is',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Is');
    },
    shortString: v => (v ? `: ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase() == value.toLowerCase();
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'isNot',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    get label() {
      return editorText('Is not');
    },
    shortString: v => (v ? `: Not ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase() != value.toLowerCase();
    },
  }),
];
