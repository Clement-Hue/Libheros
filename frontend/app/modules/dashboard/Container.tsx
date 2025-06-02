import React, {useState} from 'react';
import LeftBar from "./LeftBar";
import {makeTask, makeTaskList} from "~/core/factories";
import MainContent from "./MainContent";
import RightBar from "./RightBar";
import {useServices} from "~/core/hooks";
import useFetch from "~/core/hooks/useFetch";

function Container(props) {
    const {api} = useServices()
    const [selectedTaskId, setSelectedTaskId] = useState<string>()
    const [activeTaskListId, setActiveTaskListId] = useState<string>()
    const {data: taskLists} = useFetch({query: () => api.getTaskList()})
    const activeTaskList = taskLists?.find((list) => list.id === activeTaskListId)
    const task = activeTaskList?.tasks.find((task) => task.id === selectedTaskId)
    const handleTaskListClick = (id: string) => {
        setActiveTaskListId((prev) => prev !== id ? id : undefined)
        setSelectedTaskId(undefined)
    }
    return (
        <div className="flex flex-row gap-4">
            <LeftBar onListClick={handleTaskListClick} selectedTaskListId={activeTaskListId} taskLists={taskLists} />
            <MainContent selectedTaskId={selectedTaskId} onTaskClick={(id) => setSelectedTaskId((prev) => prev !== id ? id : undefined)} taskList={activeTaskList}/>
            <RightBar task={task} />
        </div>
    );
}

export default Container;