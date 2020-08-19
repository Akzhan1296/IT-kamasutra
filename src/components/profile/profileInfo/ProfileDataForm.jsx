import React from "react";
import {createField, Input, TextArea} from "../../common/FormsControls/FormsControls"
import {reduxForm } from "redux-form";
import s from "./profileInfo.module.css";
import style from "../../common/FormsControls/FormsControls.module.css"

const ProfileDataForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.handleSubmit}>
      <div><button >Save </button></div>

      {props.error && <div className={style.formSummaryError}>{props.error}</div>}

      
      <div>
        <b>Full name</b> {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking for a job:</b> 
        {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
      </div>
      
        <div>
          <b>My professional skills</b>: 
          {createField("My professional skills", "lookingForAJobDescription", [], TextArea)}
        </div>
        <div>
          <b>About me</b>: 
          {createField("About me", "aboutMe", [], TextArea)}
        </div>
    
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contacts}>
              <b>{key}: {createField(key, `contacts.${key}`, [], Input)}</b>
            </div> 
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({form:"edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;
