import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  Input,
  createField,
  GetStringKeys,
} from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        "Email",
        "email",
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        "Password",
        "password",
        [required],
        Input,
        {
          type: "password",
        }
      )}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "Remember me"
      )}

      {captchaUrl && <img src={captchaUrl} alt="captchaUrl" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          "Symbols",
          "captcha",
          [required],
          Input,
          {}
        )}
      {error && <div className={style.formSummaryError}>{error}</div>}

      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  // a unique name for the form
  form: "login",
})(LoginForm);

// type mapStateToPropsType = {
//   captchaUrl: string | null;
//   isAuth: boolean;
// };

// type mapDispatchToPropsType = {
//   login: (
//     email: string,
//     password: string,
//     rememberMe: boolean,
//     captcha: string
//   ) => void;
// };

export const LoginPage: React.FC = (props) => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
    //Здесь login другая, connect вызывает другой callback который имеет одно и тоже имя который приходит с reducer
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

// let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
//   captchaUrl: state.auth.captchaUrl,
//   isAuth: state.auth.isAuth,
// });

// export default connect(mapStateToProps, {
//   login,
// })(Login);
