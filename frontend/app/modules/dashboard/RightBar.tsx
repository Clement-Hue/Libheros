import React from 'react';
import {useTranslation} from "react-i18next";
import type {Task} from "~/typing/model";
import {Button} from "~/components";
import clsx from "clsx";

function RightBar({task}: Props) {
    const {t} = useTranslation()
    const sections = [
        {name: t("task.creation-date"), value: task?.creationDate.toLocaleDateString()},
        {name: t("task.short-description"), value: task?.name},
        {name: t("task.long-description"), value: task?.description},
        {name: t("task.due-date"), value: task?.date.toLocaleDateString()}
    ]
    return (
        <div className={clsx("container overflow-y-auto h-screen p-2 flex flex-col gap-2 bg-primary-500",
            "transition-[width] duration-500 ease-in-out",
                {"w-[15%]": !!task, "w-0": !task}) }>
            {sections.map(({name, value}) => (
                <div className="flex flex-col items-center gap-1">
                    <div key={name} className="text-white text-center underline text-md font-semibold">
                        {name}
                    </div>
                    <div className="text-center">
                        {value}
                    </div>
                </div>
            ))}
            <Button variant="destructive" >{t("button.delete")}</Button>
        </div>
    );
}

type Props = {
    task?: Task
}

export default RightBar;