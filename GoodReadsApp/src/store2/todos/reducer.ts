import { TodosState, TodosActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: TodosState = {
  todos: []
}

const reducer: Reducer<TodosState> = (state = initialState, action) => {
  switch (action.type) {
    case TodosActionTypes.ADD_TODO: {
      let newState = Object.assign({}, state);
      newState.todos.push({ title: action.payload, completed: false, id: state.todos.length });
      state = newState;
      return state;
    }
    case TodosActionTypes.MARK_COMPLETE: {
      return state;
    }
    case TodosActionTypes.DELETE_TODO: {
      return state;
    }
    default: return state;
  }
}

export { reducer as todosReducer };