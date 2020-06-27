import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case SET_USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const auth = () => {
  return (dispatch) => {
    authAPI.me().then((data) => {
      if (data.data.resultCode === 0) {
        let { id, login, email } = data.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {

    authAPI.login(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(auth());
      } else {
        let message =  response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("login", { _error: message }));
      }
    });

  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout().then((data) => {
      if (data.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
