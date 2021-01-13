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

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const submit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    onFilterChanged(values);
    // setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "" }}
        validate={userSearchFormValues}
        onSubmit={submit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {/* <input
              type="text"
              name="term"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.term}
            /> */}

            <Field type="text" name="term" />

            <Field as="select" name="color">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
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
