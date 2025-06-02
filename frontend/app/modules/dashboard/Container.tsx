import React from 'react';
import LeftBar from "./LeftBar";
import {makeTask, makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";
import MainContent from "./MainContent";
import RightBar from "./RightBar";
import {useServices} from "~/core/hooks";
import useFetch from "~/core/hooks/useFetch";

function Container(props) {
    const {api} = useServices()
    const task = makeTask()
    const {data: taskList} = useFetch({query: () => api.getTaskList()})
    return (
        <div className="flex flex-row gap-4">
            <LeftBar tasks={taskList} />
            <MainContent/>
            <RightBar task={task} />
        </div>
    );
}

export default Container;