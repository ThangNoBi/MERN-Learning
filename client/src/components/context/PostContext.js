import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/PostReducer";
import {
  ADD_POST,
  apiURL,
  DELETE_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  const [showPostModal, setShowPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // GET ALL POST
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiURL}/posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // ADD POST
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiURL}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error !!" };
    }
  };

  // DELETE POST
  const deletePost = async (postID) => {
    try {
      const response = await axios.delete(`${apiURL}/posts/${postID}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postID,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FIND POST
  const findPost = (postID) => {
    const newPost = postState.posts.find((postItem) => postItem._id === postID);
    dispatch({ type: FIND_POST, payload: newPost });
  };

  // UPDATE POST
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiURL}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error !!" };
    }
  };

  // Exports
  const postContextData = {
    postState,
    getPosts,
    addPost,
    showPostModal,
    setShowPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
