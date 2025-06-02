
export type Task = {
    id: string
    date: Date
    creationDate: Date
    name: string
    description: string
}

export type TaskList = {
    id: string
    name: string
    tasks: Task[]
}