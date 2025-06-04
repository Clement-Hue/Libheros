import React from 'react';
import {Button, FormInput, Modal} from "~/components";
import {useTranslation} from "react-i18next";
import {Form, Formik} from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
    value: Yup.string().required(),
});


function AddTaskListModal({isOpen, onClose, onAdd, taskListNames = []}: Props) {
    const {t} = useTranslation()
    const handleClose = () => {
       onClose?.()
    }
    const handleAdd = ({value}: {value: string}) => {
        onAdd?.({name: value})
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <Formik validationSchema={schema} initialValues={{value: ""}} onSubmit={handleAdd}>
                {({values: {value}, isValid}) => (
                    <Form className="flex flex-col gap-2">
                        <FormInput name="value" required autoFocus label={t("label.task-list-name")} />
                        <div className="flex flex-row gap-2 self-end">
                            <Button type="button" onClick={handleClose} variant="secondary">{t("button.cancel")}</Button>
                            <Button disabled={taskListNames.includes(value) || !isValid  } type="submit" >{t("button.add-task-list")}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}
type Props = {
    isOpen?: boolean
    onClose?: () => void
    onAdd?: (args: {name: string}) => void
    taskListNames?: string[]
}

export default AddTaskListModal;