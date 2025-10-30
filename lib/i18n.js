import en from "../i18n/en.json";
import ar from "../i18n/ar.json";
import he from "../i18n/he.json";

export const dictionaries = { en, ar, he };

export function t(lang, key){
  const dict = dictionaries[lang] || dictionaries.en;
  return dict[key] || key;
}
