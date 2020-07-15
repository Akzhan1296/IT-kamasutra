import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/imgs/userPhoto.jpg";
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, follow, unfollow }) => {
  
  return (
    <div key={user.id}>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              className={styles.userPhoto}
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt={user.id}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              unFollow{" "}
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          {/* <div>{user.location.country}</div> */}
          {/* <div>{user.location.city}</div> */}
        </span>
      </span>
    </div>
  );
};

export default User;
