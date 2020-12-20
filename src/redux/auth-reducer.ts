
import { securityAPI } from "../api/security-api";
import { authAPI } from "../api/auth-api"
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api"
import { BaseThunkType, InferActionsTypes } from './redux-store'

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

//reducers
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case "SN/SET_USER_DATA":
    case "SN/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };


    default:
      return state;
  }
};

//actions
export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "SN/SET_USER_DATA",
    payload: { userId, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "SN/GET_CAPTCHA_URL_SUCCESS",
    payload: { captchaUrl }
  } as const),
}

//thunks
export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, login, email } = meData.data

      dispatch(actions.setAuthUserData(id, email, login, true));
    }

    //then тоже возвращает promise
  };
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
  return async (dispatch) => {
    let lodinData = await authAPI.login(email, password, rememberMe, captcha);

    if (lodinData.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (lodinData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
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

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
  };
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;



//types 
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>