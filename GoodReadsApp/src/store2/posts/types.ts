import { PostState } from "../post/types";

export interface PostsState {
  posts: PostState[]
}

export enum PostsActionTypes {
  OPEN_POST = "@@posts/OPEN_POST",
  FETCH_POSTS = "@@posts/FETCH_POSTS",
  LOAD_POSTS = "@@posts/LOAD_POSTS"
}