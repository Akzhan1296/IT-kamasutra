import React, { useEffect } from "react";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  getUsersThunkCreator,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import { useSelector, useDispatch } from "react-redux";
import { UserType } from "../../types/types";

import {
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getFollowingInProgress,
  getUsersSuperSelector,
  getUsersFilter,
} from "../../redux/users-selectors";

import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsersSuperSelector);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getUsersFilter);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
  },[])


  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
  };

  const onFilterChanged = () => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };
  const follow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </div>
  );
};

