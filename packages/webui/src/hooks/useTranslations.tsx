import { useLocalizedStringFormatter } from '@react-aria/i18n';
import enUS_Messages from '../translations/en-US.json';
import esES_Messages from '../translations/es-ES.json';

/*
 * Hook to get the translations for the roman numeral converter
 * @returns The translations for the roman numeral converter
 */
export const useTranslations = () => {
  const formatMessage = useLocalizedStringFormatter({
    'en-US': enUS_Messages,
    'es-ES': esES_Messages,
  });

  return { formatMessage };
};
