import React from 'react';
import {useTranslation} from "react-i18next";
import {Button, Modal} from "~/components";

function DeleteTaskModal({onClose, isOpen, onDelete}: Props) {
    const {t} = useTranslation()
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            {t("modal.delete-task")}
            <div className="flex flex-row gap-2 self-end">
                <Button onClick={onClose} variant="secondary">{t("button.cancel")}</Button>
                <Button variant="destructive" onClick={onDelete}>{t("button.delete")}</Button>
            </div>
        </Modal>
    );
}

type Props = {
    isOpen?: boolean
    onClose?: () => void
    onDelete?: () => void
}

export default DeleteTaskModal;