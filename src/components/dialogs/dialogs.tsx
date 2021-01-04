import React from "react";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import s from "./dialogs.module.css";
import AddMessageFormRedux from "./addMessageForm/addMessageForm";
import { InitialStateType } from "../../redux/dialogs-reducer";

const { dialogsWrap, dialogsItem, messagesWrap, textarea, dialogBtn } = s;

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
  
}

const Dialogs: React.FC<PropsType> = (props) => {
  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

 
  return (
    <div className={dialogsWrap}>
      <div className={dialogsItem}>{dialogsElements}</div>
      <div className={messagesWrap}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
