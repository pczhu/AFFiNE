import { ScrollArea } from '@affine/admin/components/ui/scroll-area';
import { translateUiText, useUiLanguage } from '@affine/i18n';

import { Header } from '../header';
import { AboutAFFiNE } from './about';

export function ConfigPage() {
  useUiLanguage();
  return (
    <div className="h-dvh flex-1 space-y-1 flex-col flex">
      <Header title={translateUiText('Server')} />
      <ScrollArea>
        <AboutAFFiNE />
      </ScrollArea>
    </div>
  );
}

export { ConfigPage as Component };
