import React, {useState} from 'react';
import LeftBar from "./LeftBar";
import MainContent from "./MainContent";
import RightBar from "./RightBar";
import {useServices} from "~/core/hooks";
import useFetch from "~/core/hooks/useFetch";
import DeleteTaskListModal from "~/modules/dashboard/DeleteTaskListModal";
import AddTaskListModal from "~/modules/dashboard/AddTaskListModal";
import {generateId} from "~/core/utils";
import DeleteTaskModal from "~/modules/dashboard/DeleteTaskModal";

function Container() {
    const {api} = useServices()
    const [deleteTaskListId, setDeleteTaskListId] = useState<string>()
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false)
    const [showAddTaskListModal, setShowAddTaskListModal] = useState(false)
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
    const handleAddList = async  ({name}: {name: string}) => {
       try {
           const newList = await api.addTaskList({name, id: generateId()})
           setData((prev = []) => [...prev, newList])
       } finally {
           setShowAddTaskListModal(false)
       }
    }
    const handleDeleteTask = async () => {
        if (!task) return;
       try {
           await api.deleteTask({taskId: task.id})
           setData((prev = []) => prev.map((list) => {
                if (list.id !== activeTaskListId) return list;
                return {
                     ...list,
                     tasks: list.tasks.filter((t) => t.id !== task.id)
                }
           }))
       } finally {
            setShowDeleteTaskModal(false)
       }
    }
    return (
        <div className="flex flex-row gap-4">
            <DeleteTaskListModal onDelete={handleDeleteTaskList} isOpen={!!deleteTaskListId} onClose={() => setDeleteTaskListId(undefined)}/>
            <DeleteTaskModal onDelete={handleDeleteTask} isOpen={showDeleteTaskModal} onClose={() => setShowDeleteTaskModal(false)} />
            <AddTaskListModal taskListNames={taskLists?.map((m) => m.name)} onAdd={handleAddList} isOpen={showAddTaskListModal} onClose={() => setShowAddTaskListModal(false)} />
            <LeftBar onAddTaskList={() => setShowAddTaskListModal(true)} onDeleteListClick={(taskListId) => setDeleteTaskListId(taskListId)} onListClick={handleTaskListClick} selectedTaskListId={activeTaskListId} taskLists={taskLists} />
            <MainContent selectedTaskId={selectedTaskId} onTaskClick={(id) => setSelectedTaskId((prev) => prev !== id ? id : undefined)} taskList={activeTaskList}/>
            <RightBar onDeleteTask={() => setShowDeleteTaskModal(true)} task={task} />
        </div>
    );
}

export default Container;