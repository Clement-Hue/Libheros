import React, {useState} from 'react';
import LeftBar from "./LeftBar";
import {makeTask, makeTaskList} from "~/core/factories";
import MainContent from "./MainContent";
import RightBar from "./RightBar";
import {useServices} from "~/core/hooks";
import useFetch from "~/core/hooks/useFetch";

function Container(props) {
    const {api} = useServices()
    const task = makeTask()
    const [activeTaskListId, setActiveTaskListId] = useState<string>()
    const {data: taskLists} = useFetch({query: () => api.getTaskList()})
    const activeTaskList = taskLists?.find((list) => list.id === activeTaskListId)
    return (
        <div className="flex flex-row gap-4">
            <LeftBar onListClick={(id) => setActiveTaskListId((prev) => prev !== id ? id : undefined)} selectedTaskListId={activeTaskListId} taskLists={taskLists} />
            <MainContent tasks={activeTaskList?.tasks}/>
            <RightBar task={task} />
        </div>
    );
}

export default Container;