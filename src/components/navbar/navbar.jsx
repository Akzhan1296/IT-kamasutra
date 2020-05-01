import React from "react";
import {NavLink} from "react-router-dom";
import s from './navbar.module.css'; // module.css делает уникальные имена классов 
//s это объект 

const {active, item, nav} = s;

const Navbar = () => {
  return (
    <nav className={nav}>
      <div className={item}>
        <NavLink to="/profile" activeClassName={active} > Profile</NavLink>
      </div>
      <div className={item}>
        <NavLink to="/dialogs" activeClassName={active}> Messages</NavLink>
      </div>
      <div className={item}>
        <NavLink to="/users" activeClassName={active}> Users</NavLink>
      </div>
      <div className={item}>
        <NavLink to="/news" activeClassName={active}> News</NavLink>
      </div>
      <div className={item}>
        <NavLink to="/music" activeClassName={active}> Music</NavLink>
      </div>
      <div className={item}>
        <NavLink to="/setting" activeClassName={active}> Settings</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
