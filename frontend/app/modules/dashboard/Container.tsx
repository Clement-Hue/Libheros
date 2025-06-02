import React, {useState} from 'react';
import LeftBar from "./LeftBar";
import MainContent from "./MainContent";
import RightBar from "./RightBar";
import {useServices} from "~/core/hooks";
import useFetch from "~/core/hooks/useFetch";
import DeleteTaskListModal from "~/modules/dashboard/DeleteTaskListModal";

function Container(props) {
    const {api} = useServices()
    const [deleteTaskListId, setDeleteTaskListId] = useState<string>()
    const [selectedTaskId, setSelectedTaskId] = useState<string>()
    const [activeTaskListId, setActiveTaskListId] = useState<string>()
    const {data: taskLists, setData} = useFetch({query: () => api.getTaskList()})
    const activeTaskList = taskLists?.find((list) => list.id === activeTaskListId)
    const task = activeTaskList?.tasks.find((task) => task.id === selectedTaskId)
    const handleTaskListClick = (id: string) => {
        setActiveTaskListId((prev) => prev !== id ? id : undefined)
        setSelectedTaskId(undefined)
    }
    const handleDeleteTaskList = async () => {
        if (!deleteTaskListId) return;
        try {
            await api.deleteTaskList({listId: deleteTaskListId});
            setData((prev = []) => prev?.filter((l) => l.id !== deleteTaskListId) );
        } finally {
            setDeleteTaskListId(undefined);
        }
    }
    return (
        <div className="flex flex-row gap-4">
            <DeleteTaskListModal onDelete={handleDeleteTaskList} isOpen={!!deleteTaskListId} onClose={() => setDeleteTaskListId(undefined)}/>
            <LeftBar onDeleteListClick={(taskListId) => setDeleteTaskListId(taskListId)} onListClick={handleTaskListClick} selectedTaskListId={activeTaskListId} taskLists={taskLists} />
            <MainContent selectedTaskId={selectedTaskId} onTaskClick={(id) => setSelectedTaskId((prev) => prev !== id ? id : undefined)} taskList={activeTaskList}/>
            <RightBar task={task} />
        </div>
    );
}

export default Container;