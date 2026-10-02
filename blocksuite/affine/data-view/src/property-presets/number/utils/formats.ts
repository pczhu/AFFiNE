import { editorText } from '@blocksuite/affine-shared/utils';

import type { NumberFormat } from './formatter.js';

export type NumberCellFormat = {
  type: NumberFormat;
  label: string;
  symbol: string; // New property for symbol
};

export const numberFormats: NumberCellFormat[] = [
  {
    type: 'number',
    get label() {
      return editorText('Number');
    },
    symbol: '#',
  },
  {
    type: 'numberWithCommas',
    get label() {
      return editorText('Number With Commas');
    },
    symbol: '#',
  },
  {
    type: 'percent',
    get label() {
      return editorText('Percent');
    },
    symbol: '%',
  },
  {
    type: 'currencyYen',
    get label() {
      return editorText('Japanese Yen');
    },
    symbol: '¥',
  },
  {
    type: 'currencyCNY',
    get label() {
      return editorText('Chinese Yuan');
    },
    symbol: '¥',
  },
  {
    type: 'currencyINR',
    get label() {
      return editorText('Indian Rupee');
    },
    symbol: '₹',
  },
  {
    type: 'currencyUSD',
    get label() {
      return editorText('US Dollar');
    },
    symbol: '$',
  },
  {
    type: 'currencyEUR',
    get label() {
      return editorText('Euro');
    },
    symbol: '€',
  },
  {
    type: 'currencyGBP',
    get label() {
      return editorText('British Pound');
    },
    symbol: '£',
  },
];
