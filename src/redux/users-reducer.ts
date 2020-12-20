import { AppStateType, InferActionsTypes } from './redux-store';
import { usersAPI } from "../api/users-api";
import { updateObjectinArray } from "../utils/object-helpers"
import { UserType } from "../types/types"

import { Dispatch } from 'redux'
// import { ThunkAction } from 'redux-thunk';
import {BaseThunkType} from "./redux-store"

// const FOLLOW = "FOLLOW";
// const UNFOLLOW = "UNFOLLOW";
// const SET_USERS = "SET_USERS";
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";




let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids
};

type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectinArray(state.users, action.userId, "id", { followed: true })
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectinArray(state.users, action.userId, "id", { followed: false })
      };

    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId }as const ),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
  } as const), //current=> current:currentPage
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_COUNT',
    count: totalUsersCount,
  } as const), // type: SET_TOTAL_COUNT, count:totalUsersCount
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching,
  } as const), //isFetching:true
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId,
  } as const), //isFetching:true
}



type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>

type ThunkType = BaseThunkType<ActionsTypes> 


export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
    //мы задаем данные из api в setusers
  };
};



const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));

  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow.bind(usersAPI),
      actions.unfollowSuccess
    );
  };
};

export default usersReducer;
