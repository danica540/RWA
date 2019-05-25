import * as saga from "redux-saga/effects";
import { PostsActionTypes } from "./types";
import { loadPosts } from "./action";

function* hadleFetchPosts() {
  const json = yield fetch("http://localhost:4000/posts").then(response => {
    return response.json();
  });

  yield saga.put(loadPosts(json));
}

function* watchGetRequest() {
  yield saga.takeLatest(PostsActionTypes.FETCH_POSTS, hadleFetchPosts);
}

export function* postsSaga() {
  yield saga.all([saga.fork(watchGetRequest)]);
}