import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import axios from "axios";
import { apiURL, LOCALSTORAGE_TOKEN } from "./constants";
import setAuthToken from "../../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // State
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCALSTORAGE_TOKEN]) {
      setAuthToken(localStorage[LOCALSTORAGE_TOKEN]);
    }

    try {
      const response = await axios.get(`${apiURL}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCALSTORAGE_TOKEN);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCALSTORAGE_TOKEN, response.data.accessToken);

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCALSTORAGE_TOKEN, response.data.accessToken);

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout User
  const logoutUser = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return Provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
