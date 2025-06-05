import {ApiError, IApi} from "~/typing/app";
import axios from "axios";
import {Task, TaskList} from "~/typing/model";


const ISODateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: unknown): value is string => {
    return typeof value === "string" && ISODateFormat.test(value);
};

const handleDates = (data: unknown) => {
    if (isIsoDateString(data)) return new Date(data);
    if (!data || typeof data !== "object") return data;

    for (const [key, val] of Object.entries(data)) {
        if (isIsoDateString(val)) { // @ts-ignore
            data[key] = new Date(val);
        }
        else if (typeof val === "object") handleDates(val);
    }

    return data
};


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // If you're using cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        handleDates(response.data)
        return response
    },
    (error) => {
        throw new ApiError( error.response?.data?.code ?? "unexpected" );
    }
);

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class Api implements IApi {

    async addTask(args: { task: Task; listId: string }): Promise<Task> {
        return api.post<{ data: Task; }>(`/task-list/${args.listId}`, args.task).then(res => res.data.data);
    }

    async addTaskList(args: { name: string; id: string }): Promise<TaskList> {
        return api.post<{data: TaskList}>("/task-list", args).then(res => res.data.data);
    }

    async auth(args: { email: string; password: string }): Promise<void> {
        const res = await api.post<{data: {access_token: string}}>('/auth', args)
        localStorage.setItem('accessToken', res.data.data.access_token);
    }

    async deleteTask(args: { taskId: string }): Promise<void> {
        return api.delete(`/task/${args.taskId}`)
    }

    async deleteTaskList(args: { listId: string }): Promise<void> {
        return api.delete(`/task-list/${args.listId}`)
    }

    async getTaskList(): Promise<TaskList[]> {
        return api.get<{data: TaskList[]}>("/task-list").then((res) => res.data.data);
    }

    async getTasks(args: { listId: string }): Promise<Task[]> {
        return api.get<{ data: Task[]; }>(`/task-list/${args.listId}`).then(res => res.data.data);
    }

    async register(args: { firstName: string; lastName: string; email: string; password: string }): Promise<void> {
        return api.post('/auth/register', args)
    }

    async updateTask(args: { task: Task }): Promise<Task> {
        return api.put<{data: Task}>(`/task/${args.task.id}`, args.task).then(res => res.data.data);
    }

}