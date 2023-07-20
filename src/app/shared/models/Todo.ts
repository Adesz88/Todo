import { Subtask } from "./Subtask";
import { Category } from "./Category";

export interface Todo {
    id: number,
    title: string,
    date: Date,
    time?: string,
    details: string,
    subtasks: Subtask[],
    categories: Category[],
    completed: boolean
}