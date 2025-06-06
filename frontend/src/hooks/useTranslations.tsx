import { useLocalizedStringFormatter } from '@react-aria/i18n';

import enUS_Messages from '../translations/en-US.json';
import esES_Messages from '../translations/es-ES.json';

export const useTranslations = () => {
  const formatMessage = useLocalizedStringFormatter({
    'en-US': enUS_Messages,
    'es-ES': esES_Messages,
  });

  return { formatMessage };
};
