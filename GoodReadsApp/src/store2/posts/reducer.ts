import { PostsState, PostsActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: PostsState = {
  posts: [
    {
      author: "marko977x",
      comments: [],
      content: "I'm gonna be the best!",
      id: 1,
      likes: 1,
      topic: "Personal"
    },
    {
      author: "marko977x",
      comments: [],
      content: "I'm gonna be the best also in the second post!",
      id: 2,
      likes: 10,
      topic: "Personal"
    }
  ]
}

const reducer: Reducer<PostsState> = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.OPEN_POST: {
      return state;
    }
    case PostsActionTypes.FETCH_POSTS: {
      return state;
    }
    case PostsActionTypes.LOAD_POSTS: {
      return { posts: action.payload }
    }
    default: return state;
  }
}

export { reducer as postsReducer };