import React from "react";
import { reduxForm } from "redux-form";
import { Input } from "../../components/common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { createField } from "../common/FormsControls/FormsControls";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  console.log(captchaUrl);
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        null,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "Remember me"
      )}

      {captchaUrl && <img src={captchaUrl} alt="captchaUrl" />}
      {captchaUrl && createField("sybmbols", "captcha", [required], Input, {})}
      {error && <div className={style.formSummaryError}>{error}</div>}

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
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
    //Здесь login другая, connect вызывает другой callback который имеет одно и тоже имя который приходит с reducer
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  login,
})(Login);
