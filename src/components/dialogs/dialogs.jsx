import React from "react";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

import s from "./dialogs.module.css";
import { Redirect } from "react-router-dom";
import {Field,reduxForm} from 'redux-form'


const { dialogsWrap, dialogsItem, messagesWrap, textarea, dialogBtn } = s;

const Dialogs = (props) => {


  let addNewMessage = (values) => {
    console.log(values.newMessage)
    props.sendMessage(values.newMessage)
  }
 
 

  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));


  if (!props.isAuth) return <Redirect to={"/login"} />;

  return (
    <div className={dialogsWrap}>
      <div className={dialogsItem}>{dialogsElements}</div>
      <div className={messagesWrap}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} placeholder="Enter your name">
      <Field component="textarea" name="newMessage"/>
      <div>
        <button className={dialogBtn}>
          add message
        </button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm" })(AddMessageForm)

export default Dialogs;
