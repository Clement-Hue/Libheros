import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router";
import * as Yup from 'yup';
import {useServices} from "~/core/hooks";
import AppForm from "~/components/AppForm";

const schema = Yup.object().shape({
    password: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
});

function Container() {
    const {t} = useTranslation()
    const {api} = useServices()
    const navigate = useNavigate()
    return (
        <Card >
            <div className="text-xl text-center mb-8 font-bold underline">{t("title.login")}</div>
        <AppForm onSubmit={ async (values  ) => {
                await api.auth(values)
                navigate("dashboard")
            }
        } validationSchema={schema} initialValues={{email: "", password: ""}} >
            {({isSubmitting}) => (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <Input name="email" type="email" autoFocus required label={t("label.mail")}/>
                        <Input name="password" required type="password" label={t("label.password")}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Link className="w-full max-w-[200px]" to="register">
                            <Button className="w-full" variant="secondary" >{t("button.sign-up")}</Button>
                        </Link>
                        <Button disabled={isSubmitting} type="submit" className="w-full max-w-[200px]" >{t("button.sign-in")}</Button>
                    </div>
                </div>
            )}
            </AppForm>
        </Card>
    );
}

export default Container;