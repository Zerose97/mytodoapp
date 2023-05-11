export interface TodoItem {
    userId: number,
    id: number,
    title: string,
    body: string,
    checked?: boolean,
    isEdit?: boolean
}