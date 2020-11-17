import { instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum } from "./api"

type MeResponseDataType = {
  id: number
  email: string
  login: string
  // data: {
  //   id: number
  //   email: string
  //   login: string
  // },
}

type LoginResponseDataType = {
  data: {
    userId: number
  },
}

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>("auth/me").then(res => res.data);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>("auth/login", { email, password, rememberMe, captcha }).then(res => res.data);
  },
  logout() {
    return instance.delete("auth/login");
  },
};