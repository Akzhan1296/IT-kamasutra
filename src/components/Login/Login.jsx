import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../components/common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";

const LoginForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />{" "}
        Remember me
      </div>

      {props.error && (
        <div className={style.formSummaryError}>{props.error}</div>
      )}

      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe);
    //Здесь login другая, connect вызывает другой callback который имеет одно и тоже имя который приходит с reducer
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  login,
})(Login);
