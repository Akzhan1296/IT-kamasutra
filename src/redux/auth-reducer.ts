
import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptcha } from "../api/api"


const SET_USER_DATA = "samurai-network /auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network /auth/GET_CAPTCHA_URL_SUCCESS";

// export type InitialStateType2 = {
//   userId: number | null
//   email: string | null,
//   login: string | null,
//   //isFetching: boolean,
//   isAuth: boolean,
//   captchaUrl: string | null
// }

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): InitialStateType => {
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


type setAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataActionPayloadType
}

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaUrl: string }
}

const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl }
});



export const getAuthUserData = () => {
  return async (dispatch: any) => {
    let meData = await authAPI.me();


    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, login, email } = meData.data;
      dispatch(setAuthUserData(id, email, login, true));
    }

    //then тоже возвращает promise
  };
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
  return async (dispatch: any) => {
    let lodinData = await authAPI.login(email, password, rememberMe, captcha);

    if (lodinData.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (lodinData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }

      let message =
        lodinData.messages.length > 0
          ? lodinData.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
  };
};


export const logout = () => {
  return async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
