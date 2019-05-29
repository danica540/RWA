import { combineReducers } from "redux";
import { dotReducer } from "./reducers/dot-reducer";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { all, fork, takeEvery } from "@redux-saga/core/effects";
import { Image } from "../models/Image";
import { GET_IMAGES, GET_IMAGE } from "./actions/actions";
import { fetchImages, fetchImage } from "./saga";

export interface AppState {
  images: Image[]
}

export const rootReducer = combineReducers({
  dots: dotReducer
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
    takeEvery(GET_IMAGES, fetchImages),
    takeEvery(GET_IMAGE as any, fetchImage)
  ]);
}
