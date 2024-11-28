import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';//浏览器默认语言
import en from './en.json';
import zh from './zh.json';
i18n
    // .use(LanguageDetector)
    .use(initReactI18next).init({
        lng:navigator.language,
        fallbackLng:'en',
        resources:{
            'zh':{
                translation:zh
            },
            en:{
                translation:en
            }
        }
    })