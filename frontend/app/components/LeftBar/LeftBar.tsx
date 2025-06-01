import React from 'react';
import {Button, List} from "~/components";
import type {Task} from "~/typing/model";
import {useTranslation} from "react-i18next";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";

function LeftBar({children, tasks}: Props) {
    const {t} = useTranslation()
    return (
        <div className="h-screen w-[15%] relative flex flex-col items-center py-4 bg-primary-400">
            {children}
            <IconButton className="absolute top-2 -right-3"  Icon={Icon.LeftArrow} />
           <Button Icon={Icon.Plus} >{t("button.add-task")}</Button>
            <div className="p-2 mt-4 text-center text-primary-contrast-text">{t("task.all-task-list")}</div>
            <List>
                {tasks?.map(({name}) => (
                    <List.Item>
                        <button className="p-2 w-full cursor-pointer bg-primary-400 text-primary-contrast-text
                       hover:opacity-(--hover-opacity)
                       ">{name}</button>
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

type Props = React.PropsWithChildren & {
    tasks?: Task[]
}

export default LeftBar;