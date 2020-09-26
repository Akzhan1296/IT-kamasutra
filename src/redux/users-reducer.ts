import { usersAPI } from "../api/api";
import {updateObjectinArray} from "../utils/object-helpers"
import {UserType} from "../types/types"

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";




let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids
};

type InitialState = typeof initialState; 

const usersReducer = (state = initialState, action: any):InitialState  => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectinArray(state.users, action.userId, "id",{followed: true})
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectinArray(state.users, action.userId, "id",{followed: false})
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


type FollowSuccessActionType = {type: typeof FOLLOW, userId: number }
export const followSuccess = (userId:number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId:number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });


type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType>  }
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });


type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage:number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
}); //current=> current:currentPage

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_COUNT,
  count: number
}
const setTotalUsersCount = (totalUsersCount:number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount,
}); // type: SET_TOTAL_COUNT, count:totalUsersCount


type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}

const toggleIsFetching = (isFetching:boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
}); //isFetching:true


type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean,
  userId: number

}
export const toggleFollowingProgress = (isFetching:boolean, userId:number): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
}); //isFetching:true



export const getUsersThunkCreator = (page:number, pageSize:number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
    //мы задаем данные из api в setusers
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId));

  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;
