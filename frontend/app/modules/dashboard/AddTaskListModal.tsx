import React from 'react';
import {Button, Input, Modal} from "~/components";
import {useTranslation} from "react-i18next";
import {Form, Formik} from "formik";

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
            <Formik initialValues={{value: ""}} onSubmit={handleAdd}>
                {({values: {value}}) => (
                    <Form className="flex flex-col gap-2">
                        <Input name="value" required autoFocus label={t("label.task-list-name")} />
                        <div className="flex flex-row gap-2 self-end">
                            <Button type="button" onClick={handleClose} variant="secondary">{t("button.cancel")}</Button>
                            <Button disabled={!value || taskListNames.includes(value) } type="submit" >{t("button.add-task-list")}</Button>
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