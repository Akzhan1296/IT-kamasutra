import React from "react";
import { NavLink } from "react-router-dom";

import s from "./../dialogs.module.css";
const {dialog, active} = s;

const DialogItem = props => {
  const { name, id } = props;
  const path = `/dialogs/${id}`;
  return (
    <div className={(dialog, active)}>
      <NavLink to={path}> {name} </NavLink>
    </div>
  );
};
export default DialogItem;
