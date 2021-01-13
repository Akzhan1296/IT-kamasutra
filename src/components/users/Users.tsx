import React from "react";
import {UsersSearchForm} from "./UsersSearchForm"
import { FilterType } from "../../redux/users-reducer"

import {UserType} from "../../types/types"

import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  onFilterChanged: (filter: FilterType) => void
  users: Array<UserType>,
  followingInProgress: Array<number>,
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  onFilterChanged,
  totalUsersCount,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
  ...props
}) => {
  return (
    <div>

      <UsersSearchForm
        onFilterChanged={onFilterChanged}
      />
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






export default Users;
