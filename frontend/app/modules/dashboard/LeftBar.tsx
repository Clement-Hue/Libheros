import React, {useState} from 'react';
import {Button, List} from "~/components";
import type {Task, TaskList} from "~/typing/model";
import {useTranslation} from "react-i18next";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import clsx from "clsx";

function LeftBar({children, tasks, selectedTaskId}: Props) {
    const [expanded, setExpanded] = useState(true)
    const {t} = useTranslation()
    return (
        <div aria-expanded={expanded} role="toolbar" className={clsx(
            "container h-screen  relative flex flex-col items-center py-10 bg-primary-400",
            "transition-[width] duration-500 ease-in-out",
            {"w-13": !expanded, "w-[15%]": expanded}
        )}>
            {children}
            <IconButton aria-label={t("button.expand")} onClick={() => setExpanded(prev => !prev)} className="absolute top-2 -right-3 z-10"  Icon={expanded ? Icon.LeftArrow : Icon.RightArrow} />
            {expanded ? (
                <Button className="shadow-md w-1/2" Icon={Icon.Plus} >{t("button.add-task-list")}</Button>
            ): (
                <IconButton className="h-11 w-11" Icon={Icon.Plus} />
            )}
            {expanded && (
                <div className="container">
                    <div className="p-2 mt-4 truncate text-center text-primary-contrast-text">{t("task.all-task-list")}</div>
                    <List className="w-full divide-y-2 divide-primary-600">
                        {tasks?.map(({id, name}) => (
                            <List.Item key={id}  className="relative">
                                <IconButton color="red" className="z-10 my-auto absolute top-0 bottom-0 -right-2" Icon={Icon.Trash}/>
                                <button className={clsx("p-2 w-full cursor-pointer bg-primary-500 text-primary-contrast-text hover:opacity-(--hover-opacity) break-words",
                                    "truncate",
                                    {"bg-primary-300": selectedTaskId === id}
                                )}>
                                    {name}</button>
                            </List.Item>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
}

type Props = React.PropsWithChildren & {
    tasks?: TaskList[]
    selectedTaskId?: string
}

export default LeftBar;