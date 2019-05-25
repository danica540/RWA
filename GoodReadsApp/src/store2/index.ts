import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { TodosState } from "./todos/types";
import { todosReducer } from "./todos/reducer";
import { all, fork } from "@redux-saga/core/effects";
import { todosSaga } from "./todos/sagas";
import { Router } from "react-router";
import { PostsState } from "./posts/types";
import { postsReducer } from "./posts/reducer";
import { postsSaga } from "./posts/saga";

export interface AppState {
  postsState: PostsState,
  todosState: TodosState,
  router: Router
}

const rootReducer = combineReducers({
  todosState: todosReducer,
  postsState: postsReducer
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

export function* rootSaga() {
  yield all([
    fork(todosSaga),
    fork(postsSaga)
  ]);
}