export interface ListType {
    id: number,
    title: string,
}

export interface Task {
    id: number,
    listId: number,
    content: string,
    completed?: boolean,
}