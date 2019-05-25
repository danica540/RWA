export interface PostState {
  id: number
  author: string,
  topic: string,
  content: string,
  likes: number,
  comments: CommentState[]
}

export interface CommentState {
  id: number,
  author: string,
  content: string,
  likes: number,
  comments: Comment[]
}

export enum PostActionTypes {
  ADD_COMMENT = "@@post/ADD_COMMENT"
}