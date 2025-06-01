import React from 'react';
import {Button, Card, Input, List} from "~/components";
import {faker} from "@faker-js/faker";
import {makeTask} from "~/core/factories";
import {useTranslation} from "react-i18next";

function MainContent(props) {
    const {t} = useTranslation()
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
            <Card className="w-full">
                <List>
                    {faker.helpers.multiple(makeTask).map((task) => (
                        <List.Item key={task.id} >{task.name}</List.Item>
                    ))}
                </List>
            </Card>
        </div>
    );
}

export default MainContent;