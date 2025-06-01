
export type Task = {
    id: string
    name: string
    description: string
}

export type taskList = {
    id: string
    name: string
    tasks?: Task[]
}