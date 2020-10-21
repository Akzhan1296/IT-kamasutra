import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8308c36f-2bbb-47c3-b3eb-6b11d3220c35",

  },
});

export const usersAPI = {
  getUsers(currentPage = 9, pageSize = 2) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please profileAPI object");
    return profileAPI.getProfile(userId);
  },

  unFollow(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },

  follow(id: number) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  }
};


export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  },
  resultCode: ResultCodeEnum,
  messages: Array<string>
}

type LoginMeResponseType = {
  data: {
    userId: number
  },
  resultCode: ResultCodeEnum | ResultCodeForCaptcha,
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>("auth/me").then(res => res.data);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<LoginMeResponseType>("auth/login", { email, password, rememberMe, captcha }).then(res => res.data);
  },
  logout() {
    return instance.delete("auth/login");
  },
};


export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}

