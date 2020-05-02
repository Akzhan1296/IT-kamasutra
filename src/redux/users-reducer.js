import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  //каждому reducer приходит свой кусочек state
  console.log(action);
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
            //из за того что иммутабельно взяли копию элемента массива
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            //остановился здесь

            return { ...u, followed: false };
            //из за того что иммутабельно взяли копию элемента массива
          }
          return u;
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [state.followingInProgress.filter((id) => id !== action.userId)],
      };
    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
}); //current=> current:currentPage
export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount,
}); // type: SET_TOTAL_COUNT, count:totalUsersCount
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
}); //isFetching:true
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
}); //isFetching:true

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      //мы задаем данные из api в setusers
    });
  };
};

export const  follow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    usersAPI.follow(id)
    .then((data) => {
      if(data.resultCode === 0) {
        dispatch(followSuccess(id));
      }
      dispatch(toggleFollowingProgress(false, id));
    });
  };
};

export const  unfollow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    usersAPI.unFollow(id)
    .then((data) => {
      if(data.resultCode === 0) {
       dispatch(unfollowSuccess(id));
      }
      dispatch(toggleFollowingProgress(false, id));
    });
  };
};
 

export default usersReducer;
