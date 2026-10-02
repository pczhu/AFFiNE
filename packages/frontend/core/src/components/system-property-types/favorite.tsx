import { MenuItem } from '@affine/component';
import type { FilterParams } from '@affine/core/modules/collection-rules';
import { translateUiText, useUiLanguage } from '@affine/i18n';

import { FilterValueMenu } from '../filter/filter-value-menu';

export const FavoriteFilterValue = ({
  filter,
  isDraft,
  onDraftCompleted,
  onChange,
}: {
  filter: FilterParams;
  isDraft?: boolean;
  onDraftCompleted?: () => void;
  onChange?: (filter: FilterParams) => void;
}) => {
  useUiLanguage();
  return (
    <FilterValueMenu
      isDraft={isDraft}
      onDraftCompleted={onDraftCompleted}
      items={
        <>
          <MenuItem
            onClick={() => {
              onChange?.({
                ...filter,
                value: 'true',
              });
            }}
            selected={filter.value === 'true'}
          >
            {translateUiText('True')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              onChange?.({
                ...filter,
                value: 'false',
              });
            }}
            selected={filter.value !== 'true'}
          >
            {translateUiText('False')}
          </MenuItem>
        </>
      }
    >
      <span>
        {filter.value === 'true'
          ? translateUiText('True')
          : translateUiText('False')}
      </span>
    </FilterValueMenu>
  );
};
