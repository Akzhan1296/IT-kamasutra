import React from "react";
import s from './header.module.css';
import { NavLink } from "react-router-dom";

const {header} = s;

export type MapPropsType = {
  isAuth: boolean,
  login: string | null,
}

export type DispatchPropsType = {
  logout: () => void
}



const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
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