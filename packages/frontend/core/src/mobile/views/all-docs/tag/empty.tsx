import type { Tag } from '@affine/core/modules/tag';
import { translateUiText, useUiLanguage } from '@affine/i18n';

import { TagDetailHeader } from './detail-header';

export const TagEmpty = ({ tag }: { tag: Tag }) => {
  useUiLanguage();
  return (
    <>
      <TagDetailHeader tag={tag} />
      {translateUiText('Empty\n    ')}
    </>
  );
};
