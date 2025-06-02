import React, {useEffect, useState} from 'react';
import {Button, Input, Modal} from "~/components";
import {useTranslation} from "react-i18next";

function AddTaskListModal({isOpen, onClose, onAdd, taskListNames = []}: Props) {
    const {t} = useTranslation()
    const [value, setValue] = useState("")
    useEffect(() => {
       setValue("")
    }, [isOpen]);
    const handleClose = () => {
       onClose?.()
    }
    const handleAdd = () => {
        onAdd?.({name: value})
    }
    const disabled = !value || taskListNames.includes(value)
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleAdd} className="flex flex-col gap-2">
                <Input required autoFocus label={t("label.task-list-name")} value={value} onChange={(e) => setValue(e.target.value)}/>
                <div className="flex flex-row gap-2 self-end">
                    <Button type="button" onClick={handleClose} variant="secondary">{t("button.cancel")}</Button>
                    <Button disabled={disabled} type="submit" >{t("button.add-task-list")}</Button>
                </div>
            </form>
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