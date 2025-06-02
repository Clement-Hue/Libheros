import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";
import {Link} from "react-router";

function Container(props) {
    const {t} = useTranslation()
    return (
        <Card className="gap-8">
            <div className="text-xl text-center font-bold underline">{t("title.login")}</div>
            <div className="flex flex-col">
                <Input autoFocus required label={t("label.mail")}/>
                <Input required type="password" label={t("label.password")}/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Link className="w-full max-w-[200px]" to="register">
                    <Button className="w-full" variant="secondary" >{t("button.sign-up")}</Button>
                </Link>
                <Button className="w-full max-w-[200px]" >{t("button.sign-in")}</Button>
            </div>
        </Card>
    );
}

export default Container;