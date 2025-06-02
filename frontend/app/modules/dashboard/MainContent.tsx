import React from 'react';
import {Button, Card, Input, List, Tabs} from "~/components";
import {useTranslation} from "react-i18next";
import {Task, TaskList} from "~/typing/model";
import {ParseKeys} from "i18next";

function MainContent({taskList}: Props) {
    const {t} = useTranslation()
    const [activeTab, setActiveTab] = React.useState("task.active-tasks");
    const tabs = [
        {tab: "task.active-tasks" as ParseKeys<"common">, content: (
                <Card className="w-full">
                    <List>
                        {taskList?.tasks?.filter(t => !t.completed).map((task) => (
                            <List.Item className="px-4 py-2 cursor-pointer hover:bg-gray-100" key={task.id} >{task.name}</List.Item>
                        ))}
                    </List>
                </Card>
            )},
        {tab: "task.completed-tasks" as ParseKeys<"common">, content: (
                <Card className="w-full">
                    <List>
                        {taskList?.tasks?.filter(t => t.completed).map((task) => (
                            <List.Item className="px-4 py-2 cursor-pointer hover:bg-gray-100" key={task.id} >{task.name}</List.Item>
                        ))}
                    </List>
                </Card>
            )}
    ]
    return (
        <div className="mx-auto flex flex-col gap-4">
            <form className="flex flex-col items-start">
                <div className="text-xl mb-4 font-semibold underline">{t("title.add-task")}</div>
                <div className="flex flex-row flex-wrap gap-2">
                    <Input required label={t("label.short-description")} />
                    <Input label={t("label.long-description")} />
                    <Input required type="date" label={t("label.date")} />
                </div>
                <Button type="submit">{t("button.add-task")}</Button>
            </form>
            {!taskList ? (
                <div className="text-center text-md font-semibold">{t("task.no-list-selected")}</div>
            ): (
                <Tabs onTabChange={setActiveTab} active={activeTab} tabs={tabs}/>
            )}
        </div>
    );
}

type Props = {
    taskList?: TaskList
}

export default MainContent;