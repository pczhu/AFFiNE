import type { Collection } from '@affine/core/modules/collection';
import { translateUiText, useUiLanguage } from '@affine/i18n';

import { DetailHeader } from './detail';

export const EmptyCollection = ({ collection }: { collection: Collection }) => {
  useUiLanguage();
  return (
    <>
      <DetailHeader collection={collection} />
      {translateUiText('Empty\n    ')}
    </>
  );
};
