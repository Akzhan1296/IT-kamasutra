import { usersAPI } from "../api/api";
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux'
import {PostType, PhotosType, ProfileType} from "../types/types"


const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";





let initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 12 },
    { id: 2, message: "how are u?", likesCount: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: ''
};

export type InitialStateType = typeof initialState



const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  //каждому reducer приходит свой кусочек state

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        newPostText: "",
        posts: [...state.posts, newPost],
      };

    case SET_STATUS: {
      return { ...state, status: action.status };
    }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SAVE_PHOTO_SUCCESS: {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    }

    default:
      return state;
  }
};

type ActionsTypes = AddPostActionCreatorType | SetStatusACType | SetUserProfile | savePhotoSuccessActiontype;

type AddPostActionCreatorType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type SetStatusACType = {
  type: typeof SET_STATUS,
  status: string
}
export const setStatusAC = (status: string): SetStatusACType => ({ type: SET_STATUS, status });

type SetUserProfile = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfile => ({
  type: SET_USER_PROFILE,
  profile,
});

type savePhotoSuccessActiontype = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActiontype => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type DispatchType = Dispatch<ActionsTypes>


//ТАК КАК ЭТО У НАС AJAX ЗАПРОС СОЗДАЕМ THUNK
export const getUsersProfile = (userId: number):ThunkType => {
  return async (dispatch:DispatchType) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response));
  };
};

export const getStatus = (userId: number):ThunkType => {
  return async (dispatch:DispatchType) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data)); //data.data
  };
};

export const updateStatus = (status: string):ThunkType => {
  return async (dispatch:DispatchType) => {
    try {
      let response = await profileAPI.updateStatus(status);
      if (response.data.resultCode === 0) dispatch(setStatusAC(status));
    } catch (error) {
      console.error(error)
    }
  };
};

export const savePhoto = (file: any):ThunkType => {
  return async (dispatch:DispatchType) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0)
      dispatch(savePhotoSuccess(response.data.data.photos));
  };
};

export const saveProfile = (profile: ProfileType) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
      dispatch(getUsersProfile(userId));
    } else {
      dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0])
    }
  };
};

//saveProfile возвращает promise так как функция await

export default profileReducer;
