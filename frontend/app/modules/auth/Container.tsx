import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";

function Container(props) {
    const {t} = useTranslation()
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="gap-10">
                <div className="text-xl text-center font-bold underline">{t("title.login")}</div>
                <div className="flex flex-col gap-2">
                    <Input required label={t("label.username")}/>
                    <Input required type="password" label={t("label.password")}/>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Button className="w-full max-w-[200px]" variant="secondary" >{t("button.sign-up")}</Button>
                    <Button className="w-full max-w-[200px]" >{t("button.sign-in")}</Button>
                </div>
            </Card>
        </div>
    );
}

export default Container;