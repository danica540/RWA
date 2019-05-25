import * as saga from "redux-saga/effects";
import { TodosActionTypes } from "./types";

//There is no such a request, it's just an example.
function* addRequest() {
  return yield null;
}

function* watchAddRequest() {
  yield saga.takeEvery(TodosActionTypes.ADD_TODO, addRequest);
}

export function* todosSaga() {
  yield saga.all([saga.fork(watchAddRequest)]);
}