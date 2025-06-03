import type {TaskList, Task} from "./model"
import {ParseKeys} from "i18next";
import {DeepPartial} from "~/typing/extra";

export interface IApi {
    getTaskList(): Promise<TaskList[]>
    getTasks(args: {listId: string}): Promise<Task[]>
    deleteTaskList(args: {listId: string}): Promise<void>
    addTaskList(args: {name: string, id: string}): Promise<TaskList>
    deleteTask(args: {taskId: string}): Promise<void>
    addTask(args: {task: Task, listId: string}): Promise<Task>
    updateTask(args: {task: Task} ): Promise<Task>
    auth(args: {email: string, password: string}): Promise<void>
    register(args: {firstname: string, lastname: string, email: string, password: string}): Promise<void>
}

export type ErrorCode = ParseKeys<"common", {}, "error">

export class ApiError  {
    constructor(public readonly code: ErrorCode) { }
}

export type ServicesOverride = DeepPartial<Services>

export type Services = {
    api: IApi
}