import { profileAPI } from "../api/profile-api";
import { stopSubmit, FormAction } from "redux-form";
import { PostType, PhotosType, ProfileType } from "../types/types"
import { InferActionsTypes, BaseThunkType } from "./redux-store"


let initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 12 },
    { id: 2, message: "how are u?", likesCount: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  //каждому reducer приходит свой кусочек state

  switch (action.type) {
    case "SN/PROFILE/ADD-POST":
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case "SN/PROFILE/SET_STATUS": {
      return { ...state, status: action.status };
    }

    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };

    case "SN/PROFILE/SAVE_PHOTO_SUCCESS": {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    }

    default:
      return state;
  }
};

//actions
export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: "SN/PROFILE/ADD-POST",
    newPostText,
  } as const),
  setStatusAC: (status: string) => ({ type: "SN/PROFILE/SET_STATUS", status } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: "SN/PROFILE/SET_USER_PROFILE",
    profile,
  } as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
    photos,
  } as const)
}


//thunks
export const getUsersProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
  };
};

export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusAC(data)); //data.data
  };
};

export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    try {
      let data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) dispatch(actions.setStatusAC(status));
    } catch (error) {
      console.error(error)
    }
  };
};

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0)
      dispatch(actions.savePhotoSuccess(response.data.data.photos));
  };
};

export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {

      if(userId !== null){
        dispatch(getUsersProfile(userId));
      } else {
        throw new Error("user id can not be null")
      }

      
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      return Promise.reject(data.messages[0])
    }
  };
};
//saveProfile возвращает promise так как функция await

export default profileReducer;


//types 
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
