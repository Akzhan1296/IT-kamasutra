import React from "react";
import { Textarea } from "../../common/FormsControls/FormsControls";
import { Field, reduxForm } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} placeholder="Enter your name">
      <Field
        component={Textarea}
        validate={[required, maxLength50]}
        name="newMessage"
      />
      <div>
        <button>add message</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm);
