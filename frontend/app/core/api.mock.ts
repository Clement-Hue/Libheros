import {ApiError, IApi} from "~/typing/app";
import {Task, TaskList} from "~/typing/model";
import {name} from "ci-info";

export default class ApiMock implements IApi {
    constructor(private taskList: TaskList[] = []) {}

    async getTaskList(): Promise<TaskList[]> {
        return this.taskList
    }

    async getTasks({listId}: { listId: string }): Promise<Task[]> {
        const list = this.taskList.find(i => i.id === listId);
        if (!list) {
            throw new ApiError("list.not-found");
        }
        return list.tasks;
    }

    async deleteTaskList(args: { listId: string }): Promise<void> {
        this.taskList = this.taskList.filter((l) => l.id !== args.listId);
    }

    async addTaskList({name, id}: { name: string; id: string }): Promise<TaskList> {
        const newList = {tasks: [], id, name};
        if (this.taskList.some(i => i.name === name)) {
            throw new ApiError("list.name-exist");
        }
        this.taskList = [...this.taskList, newList]
        return newList
    }

    async deleteTask(args: { taskId: string }): Promise<void> {
        const taskList = this.taskList.find(list => list.tasks.some(task => task.id === args.taskId));
        if (!taskList) {
            throw new ApiError("list.not-found");
        }
        this.taskList = this.taskList.map((list) => {
            if (list.id !== taskList.id) return list;
            return {
                ...list,
                tasks: list.tasks.filter(task => task.id !== args.taskId)
            }
        })
    }

    async addTask({task, listId}: { task: Task; listId: string })  {
        this.taskList = this.taskList.map((list) => {
            if (list.id !== listId) return list;
            return {
                ...list,
                tasks: [...list.tasks, task]
            }
        })
        return task
    }

    async updateTask({task}: {task: Task}): Promise<Task> {
        const taskList = this.taskList.find(list => list.tasks.some(t => t.id === task.id));
        this.taskList = this.taskList.map((list) => {
            if (list.id !== taskList?.id) return list;
            return {
                ...list,
                tasks: list.tasks.map((t) => {
                    if (t.id !== task.id) return t;
                    return {
                        ...t,
                        ...task
                    }
                })
            }
        })
        return task
    }

}