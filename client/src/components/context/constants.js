export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://mern-leaning-app.herokuapp.com/api";

export const LOCALSTORAGE_TOKEN = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";

// https://mern-leaning-app.herokuapp.com/
// http://localhost:5000/api
