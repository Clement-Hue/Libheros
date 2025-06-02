import {ApiError, IApi} from "~/typing/app";
import {Task, TaskList} from "~/typing/model";

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
}