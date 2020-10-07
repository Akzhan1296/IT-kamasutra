import React from "react";
import styles from "./users.module.css";
import {UserType} from "../../types/types"

import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  users: Array<UserType>,
  followingInProgress: Array<number>,
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
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
