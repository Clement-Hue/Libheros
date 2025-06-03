import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router";
import AppForm from "~/components/AppForm";
import {useServices} from "~/core/hooks";
import * as Yup from "yup";
import i18n from "i18next";

const schema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
    "confirm-email": Yup.string().required()
        .oneOf([Yup.ref("email")], i18n.t("form.emails-not-match")),
    "confirm-password": Yup.string().required()
        .oneOf([Yup.ref("password")], i18n.t("form.passwords-not-match"))
});

function Container() {
    const {t} = useTranslation()
    const {api} = useServices()
    const navigate = useNavigate()
    return (
        <Card className="gap-8">
            <div className="text-xl text-center font-bold underline">{t("title.register")}</div>
            <AppForm validationSchema={schema} initialValues={{
               firstname: "", lastname: "", email: "", "confirm-email": "", password: "", "confirm-password": ""
            }} onSubmit={async (values) => {
                    await api.register(values)
                    navigate("/")
                 }}>
                {({isSubmitting, isValid}) => (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <Input name="firstname" autoFocus required label={t("label.firstname")}/>
                            <Input name="lastname" required label={t("label.lastname")}/>
                            <Input name="email" type="email" required label={t("label.mail")}/>
                            <Input name="confirm-email" required label={t("label.confirm-mail")}/>
                            <Input name="password" required type="password" label={t("label.password")}/>
                            <Input name="confirm-password" required type="password" label={t("label.confirm-password")}/>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Button disabled={isSubmitting || !isValid} type="submit" className="w-full max-w-[200px]" variant="primary" >{t("button.sign-up")}</Button>
                            <div className="w-full max-w-[200px]" >
                                <div className="text-sm text-gray-600 text-center">{t("register.already-have-account")}</div>
                                <Link to="/">
                                    <Button  className="w-full" variant="secondary" >{t("button.sign-in")}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </AppForm>
        </Card>
    );
}

export default Container;
