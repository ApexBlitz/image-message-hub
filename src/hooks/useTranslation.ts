
import { useState } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key];
  };

  return {
    t,
    currentLanguage,
    setCurrentLanguage,
  };
};
