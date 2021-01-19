import React from "react";
import { Formik, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";

const userSearchFormValues = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string,
  friend: "true" | "false" | "null"
}

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {

    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }

    onFilterChanged(filter);
    // setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: "null" }}
        validate={userSearchFormValues}
        onSubmit={submit}
      >
        {({
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Field type="text" name="term" />
            <Field as="select" name="color">
              <option value="red">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export { UsersSearchForm };
