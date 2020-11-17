import { UserType } from './../types/types';

import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8308c36f-2bbb-47c3-b3eb-6b11d3220c35",

  },
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,

}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}


export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}




