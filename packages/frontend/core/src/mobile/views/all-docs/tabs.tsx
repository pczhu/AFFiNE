import {
  WorkbenchLink,
  WorkbenchService,
} from '@affine/core/modules/workbench';
import { translateUiText } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';

import * as styles from './style.css';

interface Tab {
  to: string;
  label: string;
}

const tabs: Tab[] = [
  {
    to: '/all',
    get label() {
      return translateUiText('Docs');
    },
  },
  {
    to: '/collection',
    get label() {
      return translateUiText('Collections');
    },
  },
  {
    to: '/tag',
    get label() {
      return translateUiText('Tags');
    },
  },
];

export const AllDocsTabs = () => {
  const workbench = useService(WorkbenchService).workbench;
  const location = useLiveData(workbench.location$);

  return (
    <ul className={styles.tabs}>
      {tabs.map(tab => {
        return (
          <WorkbenchLink
            data-active={location.pathname === tab.to}
            replaceHistory
            className={styles.tab}
            key={tab.to}
            to={tab.to}
          >
            {tab.label}
          </WorkbenchLink>
        );
      })}
    </ul>
  );
};
