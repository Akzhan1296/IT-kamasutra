import { usersAPI } from "../api/api";
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 12 },
    { id: 2, message: "how are u?", likesCount: 11 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export const setStatusAC = (status) => ({ type: SET_STATUS, status });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

//ТАК КАК ЭТО У НАС AJAX ЗАПРОС СОЗДАЕМ THUNK
export const getUsersProfile = (userId) => {
  return async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response));
  };
};

export const getStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data)); //data.data
  };
};

export const updateStatus = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) dispatch(setStatusAC(status));
  };
};

export const savePhoto = (file) => {
  return async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0)
      dispatch(savePhotoSuccess(response.data.data.photos));
  };
};

export const saveProfile = (profile) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
      dispatch(getUsersProfile(userId));
    } else {
      dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0])
    }
  };
};

//saveProfile возвращает promise так как функция await

export default profileReducer;
