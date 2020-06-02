import {usersAPI} from "../api/api";
import {profileAPI} from "../api/api";


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 12 },
    { id: 2, message: "how are u?", likesCount: 11 },
  ],
  newPostText: "lorem ipson",
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  //каждому reducer приходит свой кусочек state

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        newPostText: "",
        posts: [...state.posts, newPost],
      };

    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newText };
    }

    case SET_STATUS: {
      return { ...state, status: action.status };

    }



    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const setStatusAC = (status) => {
  return {
    type: SET_STATUS, status
  }
};
//ТАК КАК ЭТО У НАС AJAX ЗАПРОС СОЗДАЕМ THUNK 

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId)
    .then((response) => { 
      dispatch(setStatusAC(response.data)); //data.data
    }); 
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status)
    .then((response) => { 
      console.log(response)
      if(response.data.resultCode === 0)


      dispatch(setStatusAC(status));
    }); 
  }
}



const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const getUsersProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
    .then((data) => { 
      dispatch(setUserProfile(data));
    }); 
  }
}


export default profileReducer;
