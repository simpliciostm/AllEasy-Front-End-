export interface ITask {
    id: string,
    title: string,
    description: string,
    priority: string,
    category: string,
    status: string,
    refUser: string
}

export interface ITaskComponent {
    id: string,
    key: string | number,
    title: string,
    description: string,
    category: string,
    refUser: string,
    status: string,
    priority: string,
    onDelete: (idTask: string) => void
    onPut: (idTask: string, task: ITask) => void
}

export interface ITaskList {
    fieldname: string
    total: number,
    fill?: string
}
