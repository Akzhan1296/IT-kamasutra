import React from "react";


import s from "./../dialogs.module.css";
const {dialog} = s;



const Message = props => {
  const { message } = props;
  return <div className={dialog}>{message}</div>;
};


export default Message;
