import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

export default i18n;