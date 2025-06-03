import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Yup from 'yup';
import { setLocale } from 'yup';

import en from "./en";

export const defaultNS = "common";
export const resources = {
    en,
} as const;

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    ns: Object.keys(en),
    fallbackNS: "common",
    defaultNS,
    resources,
    interpolation: {
        escapeValue: false,
    },
});

setLocale({
    mixed: {
        required: () => i18n.t('form.required'),
    },
    string: {
        email: () => i18n.t('form.invalid-email'),
    },
});

export default i18n;