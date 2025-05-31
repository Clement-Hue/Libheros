import React from 'react';
import {Button, Input} from "~/components";
import {useTranslation} from "react-i18next";

function Container(props) {
    const {t} = useTranslation()
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="min-w-sm flex flex-col gap-10 bg-white p-6">
                <div className="text-xl text-center font-bold underline">{t("title.login")}</div>
                <div className="flex flex-col gap-2">
                    <Input label={t("label.username")}/>
                    <Input type="password" label={t("label.password")}/>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Button className="min-w-1/2" variant="secondary" >{t("button.sign-up")}</Button>
                    <Button className="min-w-1/2" >{t("button.sign-in")}</Button>
                </div>
            </div>
        </div>
    );
}

export default Container;