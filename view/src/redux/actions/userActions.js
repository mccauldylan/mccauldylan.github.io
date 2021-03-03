import axios from "axios";
// import {
//     SET_USER,
//     SET_ERRORS,
//     CLEAR_ERRORS,
//     LOADING_UI} from '../types'

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERRORS",
        payload: error.response.data,
      });
    });
};
export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERRORS",
        payload: error.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios.get("/user").then((res) => {
    dispatch({
      type: "SET_USER",
      payload: res.data,
    });
  });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};