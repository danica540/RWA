import { combineReducers } from "redux";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery } from "@redux-saga/core/effects";
import { Image } from "../models/Image";
import { fetchImages } from "./image-ARS/saga";
import { reducer } from "./image-ARS/reducer";
import { GET_IMAGES } from "./image-ARS/actions";

export interface AppState {
  images: Image[]
}

export const rootReducer = combineReducers({
  images: reducer
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
    takeEvery(GET_IMAGES, fetchImages)
  ]);
}
