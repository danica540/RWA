import { TodosActionTypes } from "./types";
import { action } from "typesafe-actions";

export const addTodo = (title: string) => action(TodosActionTypes.ADD_TODO, title);
export const markComplete = (id: number) => action(TodosActionTypes.MARK_COMPLETE, id);
export const deleteTodo = (id: number) => action(TodosActionTypes.DELETE_TODO, id);