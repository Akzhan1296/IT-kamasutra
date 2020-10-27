import React from "react";
import styles from "./FormsControls.module.css";
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};


const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
      <div>{children} </div>
      {hasError && <span>{error} </span>}
    </div>
  );
};

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restprops } = props;
  return (
    <FormControl {...props}>
      {" "}
      <textarea {...input} {...restprops} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        component={component}
        validate={validators}
        {...props}
      />
      {text}
    </div>
  );
}
