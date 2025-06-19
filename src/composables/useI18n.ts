import { ref, computed } from 'vue';
import type { Language } from '@/types';
import { translations } from '@/i18n';

const currentLanguage = ref<Language>('zh-TW');

export function useI18n() {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage.value];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const initLanguage = () => {
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language;
    
    if (savedLang) {
      currentLanguage.value = savedLang;
    } else if (browserLang.startsWith('zh')) {
      currentLanguage.value = 'zh-TW';
    } else {
      currentLanguage.value = 'en-US';
    }
  };

  return {
    currentLanguage: computed(() => currentLanguage.value),
    setLanguage,
    t,
    initLanguage,
  };
}