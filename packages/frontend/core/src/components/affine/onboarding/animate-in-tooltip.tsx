import { Button } from '@affine/component';
import { translateUiText, useUiLanguage } from '@affine/i18n';

import * as styles from './animate-in-tooltip.css';

interface AnimateInTooltipProps {
  onNext: () => void;
  visible?: boolean;
}

export const AnimateInTooltip = ({
  onNext,
  visible,
}: AnimateInTooltipProps) => {
  useUiLanguage();
  return (
    <>
      <div className={styles.tooltip}>
        {translateUiText('AFFiNE is a workspace with fully merged docs, ')}
        <br />
        {translateUiText('whiteboards and databases\n      ')}
      </div>
      <div className={styles.next}>
        {visible ? (
          <Button variant="primary" size="extraLarge" onClick={onNext}>
            {translateUiText('Next\n          ')}
          </Button>
        ) : null}
      </div>
    </>
  );
};
