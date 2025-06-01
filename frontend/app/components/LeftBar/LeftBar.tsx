import React from 'react';
import {Button, List} from "~/components";
import type {Task} from "~/typing/model";
import {useTranslation} from "react-i18next";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import clsx from "clsx";

function LeftBar({children, tasks, selectedTaskId}: Props) {
    const {t} = useTranslation()
    return (
        <div className="h-screen w-[15%] relative flex flex-col items-center py-6 bg-primary-400">
            {children}
            <IconButton className="absolute top-2 -right-3"  Icon={Icon.LeftArrow} />
           <Button className="shadow-md w-1/2" Icon={Icon.Plus} >{t("button.add-task-list")}</Button>
            <div className="p-2 mt-4 text-center text-primary-contrast-text">{t("task.all-task-list")}</div>
            <List className="w-full">
                {tasks?.map(({name, id}) => (
                    <List.Item >
                        <button className={clsx("p-2 w-full cursor-pointer bg-primary-300 text-primary-contrast-text hover:opacity-(--hover-opacity)",
                            {"bg-primary-600": selectedTaskId === id}
                        )}>
                            {name}</button>
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

type Props = React.PropsWithChildren & {
    tasks?: Task[]
    selectedTaskId?: string
}

export default LeftBar;