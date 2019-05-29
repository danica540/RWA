import { combineReducers } from "redux";
import { Book } from "../models/Book";
import { bookReducer } from "./reducers/book-reducer";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { all, fork, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { fetchBooks, fetchUser } from "./saga";
import { GET_BOOKS } from "./actions/book-actions";
import { User } from "../models/User";
import { userReducer } from "./reducers/user-reducer";
import { GET_USER } from "./actions/user-actions";

export interface AppState {
  books: Book[];
  user: User;
}

export const rootReducer = combineReducers({
  books: bookReducer,
  user:userReducer
  //, selected: selectedReducer
  // ne buni se ako dodamo inicijalno stanje

  // domaci, jos jedan reducer koji se da vrsi selected book, book da imas stanje, ako nista nije selektovano onda je null 
})


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
    takeEvery(GET_BOOKS, fetchBooks),
    takeEvery(GET_USER,fetchUser)
  ]);
}
