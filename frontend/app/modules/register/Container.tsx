import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";
import {Link} from "react-router";

function Container(props) {
    const {t} = useTranslation()
    return (
        <Card className="gap-8">
            <div className="text-xl text-center font-bold underline">{t("title.register")}</div>
            <div className="flex flex-col">
                <Input autoFocus required label={t("label.firstname")}/>
                <Input required label={t("label.lastname")}/>
                <Input required label={t("label.mail")}/>
                <Input required label={t("label.confirm-mail")}/>
                <Input required type="password" label={t("label.password")}/>
                <Input required type="password" label={t("label.confirm-password")}/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button className="w-full max-w-[200px]" variant="primary" >{t("button.sign-up")}</Button>
                <div className="w-full max-w-[200px]" >
                    <div className="text-sm text-gray-600 text-center">{t("register.already-have-account")}</div>
                    <Link to="/">
                        <Button className="w-full" variant="secondary" >{t("button.sign-in")}</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default Container;
