import React from "react";
import { Formik, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import {
  getUsersFilter,
} from "../../redux/users-selectors";

const userSearchFormValues = () => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null"

type FormType = {
  term: string,
  friend: FriendFormType
}  

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const filter = useSelector(getUsersFilter);
  
  
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {

    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
   
    onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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
            <Field as="select" name="friend">
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
