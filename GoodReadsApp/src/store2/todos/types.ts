export interface TodosState {
  todos: TodoItem[]
}

export interface TodoItem {
  id: number,
  title: string,
  completed: boolean
}

export enum TodosActionTypes {
  ADD_TODO = "@@todos/ADD_TODO",
  MARK_COMPLETE = "@@todos/MARK_COMPLETE",
  DELETE_TODO = "@@todos/DELETE_TODO"
};