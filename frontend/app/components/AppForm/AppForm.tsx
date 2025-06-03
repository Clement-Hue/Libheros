import React from "react";
import {Formik, FormikConfig, Form, FormikHelpers, FormikProps, FormikValues} from "formik";
import { GlobalError } from "~/components";
import {ApiError} from "~/typing/app";


function AppForm<Values extends FormikValues>(props: Props<Values>) {
    const { onSubmit, children, ...rest } = props;

    return (
        <Formik<Values> {...rest} onSubmit={ async (
            values: Values,
            formikBag: FormikHelpers<Values> ) => {
            const {setStatus, setSubmitting} = formikBag;
            try {
                await onSubmit(values, formikBag);
            } catch (e) {
                if (e instanceof ApiError) {
                    setStatus({error: e.code});
                } else {
                    setStatus({error: 'unexpected'});
                }
            } finally {
                setSubmitting(false);
            }
        }}>
            {(formikProps) => (
                <Form>
                    <GlobalError />
                    {children(formikProps)}
                </Form>
            )}
        </Formik>
    );
}

type Props<Values> = Omit<FormikConfig<Values>, "onSubmit"> & {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<void>;
    children: (props: FormikProps<Values>) => React.ReactNode;
};

export default AppForm;