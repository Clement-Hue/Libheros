import React from 'react';
import {useFormikContext} from "formik";
import {useTranslation} from "react-i18next";
import {ErrorCode} from "~/typing/app";

function GlobalError() {
    const {status} = useFormikContext()
    const {t} = useTranslation()
    return status?.error && (
        <div className="text-red-contrast-text bg-red-400 text-md text-center p-2 my-2 rounded-md">{t(`error.${status.error as ErrorCode}`)}</div>
    );
}

export default GlobalError;