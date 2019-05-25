import { action } from "typesafe-actions";
import { PostsActionTypes, PostsState } from "./types";

export const openPost = (id: number) => action(PostsActionTypes.OPEN_POST, id);
export const fetchPosts = () => action(PostsActionTypes.FETCH_POSTS);
export const loadPosts = (posts: PostsState) => action(PostsActionTypes.LOAD_POSTS, posts);