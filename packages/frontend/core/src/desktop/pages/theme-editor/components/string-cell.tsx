import { Input } from '@affine/component';
import { translateUiText, useUiLanguage } from '@affine/i18n';
import { useCallback, useState } from 'react';

import * as styles from './string-cell.css';

export const StringCell = ({
  value,
  custom,
  onValueChange,
}: {
  value: string;
  custom?: string;
  onValueChange?: (color?: string) => void;
}) => {
  useUiLanguage();
  const [inputValue, setInputValue] = useState(custom ?? '');

  const onInput = useCallback(
    (color: string) => {
      onValueChange?.(color || undefined);
      setInputValue(color);
    },
    [onValueChange]
  );

  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      <div className={styles.row}>{value}</div>
      <Input
        placeholder={translateUiText('Input value to override')}
        style={{ width: '100%' }}
        value={inputValue}
        onChange={onInput}
      />
    </div>
  );
};
