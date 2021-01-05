import React from "react";
import s from "./Post.module.css";

const { item } = s;

type PropsType = {
  message: string;
  likeCount: number;
};

const Post: React.FC<PropsType> = ({ message, likeCount }) => {
  return (
    <div className={item}>
      {message}
      <div> like {likeCount}</div>
    </div>
  );
};

export default Post;
