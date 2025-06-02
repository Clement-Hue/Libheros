
export type Task = {
    id: string
    date: Date
    creationDate: Date
    name: string
    description: string
    completed: boolean
}

export type TaskList = {
    id: string
    name: string
    tasks: Task[]
}