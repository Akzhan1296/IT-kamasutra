import React from "react";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

import s from "./dialogs.module.css";
import {Redirect} from "react-router-dom";
const { dialogsWrap, dialogsItem, messagesWrap, textarea, dialogBtn } = s;


const Dialogs = ({ dialogsPage: {messages, dialogs, newMessage}, updateNewMessageBoby,sendMessage, isAuth}) => {

  let dialogsElements = dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messagesElements = messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));



  const onSendMessageClick = () => {
    sendMessage(); // from props
  };

  const changeMessageTextArea = (e) => {
    let text = e.target.value;
    updateNewMessageBoby(text); // from props
  };

  if(! isAuth) return <Redirect to={"/login"}/>

  return (
    <div className={dialogsWrap}>
      <div className={dialogsItem}>{dialogsElements}</div>
      <div className={messagesWrap}>{messagesElements}</div>

      <div>
        <div>
          <textarea
            onChange={changeMessageTextArea}
            value={newMessage}
            className={textarea}
          />
        </div>
        <div>
          <button onClick={onSendMessageClick} className={dialogBtn}>
            add message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
