import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  required
} from "../../../../utils/validators/validators";
import {
  Input,
  createField,
  GetStringKeys
} from "../../../common/FormsControls/FormsControls";


type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;



const AddNewPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          "Your post",
          "newPostText",
          [required],
          Input,
          {
            type: "password",
          }
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: "profileAddNewPostForm" })(AddNewPostForm);
