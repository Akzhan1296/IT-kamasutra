import React from "react";
import s from './header.module.css';
import { NavLink } from "react-router-dom";

const {header} = s;
//Вложенность не сломаеться 

const Header = (props) => {
    return (
      <header className = {header}>
        <img src="https://cdn.worldvectorlogo.com/logos/tiktok-logo.svg" />
      <div className={s.loginBlock}>
        {props.isAuth ? props.login :
        <NavLink to={"/login"}>
          Login
        </NavLink>}
      </div>
      </header>
    );
}

export default Header;