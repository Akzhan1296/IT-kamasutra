import React from "react";
import {
  TextArea,
  createField,
} from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { NewMessageFormValuesType } from "../dialogs";


type NewMessageFormValueseKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;
type PropsType = {};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} placeholder="Enter your name">
      {createField<NewMessageFormValueseKeysType>(
        "Enter your message",
        "newMessageBody",
        [required, maxLength50],
        TextArea
      )}

      <div>
        <button>add message</button>
      </div>
    </form>
  );
};

export default reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(AddMessageForm);
