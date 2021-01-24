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
import * as queryString from "querystring";

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
import { useHistory } from "react-router-dom";

type PropsType = {};
type QueryParamsType = {
  term: string;
  page: string;
  friend: string;
};



export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsersSuperSelector);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getUsersFilter);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType
    console.log(parsed);

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
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
