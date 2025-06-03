import React from 'react';
import {Button, Card, Input} from "~/components";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {useServices} from "~/core/hooks";

const schema = Yup.object().shape({
    password: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
});

function Container(props) {
    const {t} = useTranslation()
    const {api} = useServices()
    const navigate = useNavigate()
    return (
        <Formik onSubmit={async (values ) => {
            await api.auth(values)
            navigate("dashboard")
        }} validationSchema={schema} initialValues={{email: "", password: ""}} >
            {({isSubmitting}) => (
                <Card >
                    <div className="mb-8 text-xl text-center font-bold underline">{t("title.login")}</div>
                    <Form className="flex flex-col gap-4">
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
                    </Form>
                </Card>
            )}
        </Formik>
    );
}

export default Container;