import { InferActionsTypes } from './redux-store';
import { usersAPI } from "../api/users-api";
import { updateObjectinArray } from "../utils/object-helpers"
import { UserType } from "../types/types"

import { Dispatch } from 'redux'

import { BaseThunkType } from "./redux-store"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids,
  filter: {
    term: '',
    friend: null as null | boolean
  }
};


//reducers
const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state, 
        users: updateObjectinArray(state.users, action.userId, "id", { followed: true })
      };
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectinArray(state.users, action.userId, "id", { followed: false })
      };

    case 'SN/USERS/SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SN/USERS/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'SN/USERS/SET_TOTAL_COUNT':
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };

    case "SN/USERS/SET_FILTER": {
      return {
        ...state,
        filter: action.payload
      }
    }
    default:
      return state;
  }
};

export default usersReducer;

//actions
export const actions = {
  followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'SN/USERS/SET_CURRENT_PAGE',
    currentPage,
  } as const), //current=> current:currentPage
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SN/USERS/SET_TOTAL_COUNT',
    count: totalUsersCount,
  } as const), 
  setFilter: (filter: FilterType) => ({
    type: "SN/USERS/SET_FILTER",
    payload: filter
  } as const),

  toggleIsFetching: (isFetching: boolean) => ({
    type: 'SN/USERS/TOGGLE_IS_FETCHING',
    isFetching,
  } as const), 
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId,
  } as const), 
}


//thunks
export const getUsersThunkCreator = (page: number, pageSize: number,  filter: FilterType): ThunkType => {
  return async (dispatch, getState) => {
    console.log(filter)

    dispatch(actions.toggleIsFetching(true));
    let response = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
    dispatch(actions.setFilter(filter))
    dispatch(actions.setCurrentPage(page))
    //мы задаем данные из api в setusers
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
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


//types 
type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes> 