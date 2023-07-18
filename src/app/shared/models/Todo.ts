import { Subtask } from "../Subtask";
import { Category } from "./Category";

export interface Todo {
    title: string,
    date: Date,
    time?: Date,
    details: string,
    subtasks: Subtask[],
    categories: Category[]
}