import {
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "../context/constants";

export const postReducer = (state, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        postLoading: false,
      };

    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };

    case FIND_POST:
      return { ...state, post: action.payload };

    case UPDATE_POST:
      const newPosts = state.posts.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

      return { ...state, posts: newPosts };
    default:
      return state;
  }
};
