import {usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
let initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 12 },
    { id: 2, message: "how are u?", likesCount: 11 },
  ],
  newPostText: "lorem ipson",
  profile: null
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
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setUsers = (userId) => {
  return (dispatch) => {
    usersAPI.userId(userId)
    .then((data) => { 
      dispatch(setUserProfile(data));
    }); 
  }
}


export default profileReducer;
