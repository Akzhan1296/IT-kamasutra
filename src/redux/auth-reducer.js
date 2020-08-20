import { authAPI,securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "samurai-network /auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network /auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
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

const getCaptchaUrlSuccess  = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl}
});



export const auth = () => {
  return async (dispatch) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }

    //then тоже возвращает promise
  };
};

export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
      dispatch(auth());
    } else {
      if(response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }

      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
  };
};


export const logout = () => {
  return async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
