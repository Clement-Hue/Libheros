
export type Task = {
    id: string
    date: Date
    creationDate: Date
    name: string
    description: string
}

export type taskList = {
    id: string
    name: string
    tasks?: Task[]
}