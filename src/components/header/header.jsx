import React from "react";
import s from './header.module.css';
import { NavLink } from "react-router-dom";

const {header} = s;
//Вложенность не сломаеться 

const Header = (props) => {

    return (
      <header className = {header}>
        <img src="https://cdn.worldvectorlogo.com/logos/tiktok-logo.svg" alt="img"/>
      <div className={s.loginBlock}>
          {props.isAuth ? <div>{props.login} <button onClick={props.logout}> Log out</button> </div>  :
        <NavLink to={"/login"}>
          Login
        </NavLink>}
      </div>
      </header>
    );
}

export default Header;

//Через props мы получаем данные из thunk 
//Мы поулчаем isAuth 
//if isAuth === true => показываем название логина 
//if isAuth ===false тогда делаем ссылку на компоненту логин