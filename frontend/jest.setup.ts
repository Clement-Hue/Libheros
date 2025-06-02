import '@testing-library/jest-dom';

const I18next = {
    useTranslation: () => {
        return {
            t: (i18nKey: string) => i18nKey,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => { },
    }
}

jest.mock("react-i18next", () => I18next)