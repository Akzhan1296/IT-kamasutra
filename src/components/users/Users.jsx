import React, { Component } from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/imgs/userPhoto.jpg";
import { NavLink } from "react-router-dom";
import * as axios from "axios";
const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              key={p}
              className={props.currentPage === p && styles.selectedPage}
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}{" "}
            </span>
          );
        })}
      </div>

      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  className={styles.userPhoto}
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  alt={u.id}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    axios
                    .delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                        withCredentials: true,
                        headers: {
                          "API-KEY": "61d897f7-494d-49de-b6d4-e7d97f57a8ab"
                        }
                      }
                    )
                    .then((response) => {
                      if(response.data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                    });
                  
                  }}
                >
                  unFollow{" "}
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                    .post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},{
                        withCredentials: true,
                        headers: {
                          "API-KEY": "61d897f7-494d-49de-b6d4-e7d97f57a8ab"
                        } 
                      }
                    )
                    .then((response) => {
                      if(response.data.resultCode === 0) {
                        props.follow(u.id);
                      }
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              {/* <div>{u.location.country}</div> */}
              {/* <div>{u.location.city}</div> */}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
