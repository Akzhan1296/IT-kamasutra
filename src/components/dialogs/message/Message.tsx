import React from "react";


import s from "./../dialogs.module.css";
const {dialog} = s;

type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = props => {
  const { message } = props;
  return <div className={dialog}>{message}</div>;
};


export default Message;
