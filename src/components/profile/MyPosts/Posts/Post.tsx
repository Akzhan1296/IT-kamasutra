import React from "react";
import s from "./Post.module.css";

const { item } = s;

const Post = ({ message, likeCount }) => {
  return (
    <div className={item}>
      {message}
      <div> like {likeCount}</div>
    </div>
  );
};

export default Post;
