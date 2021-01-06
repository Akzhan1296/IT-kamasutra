import React from "react";
import { NavLink } from "react-router-dom";

import s from "./../dialogs.module.css";


type PropsType = {
  name: string,
  id: number,

}

const DialogItem: React.FC<PropsType> = props => {
  const { name, id } = props;
  const path = `/dialogs/${id}`;
  return (
    <div className={(s.dialog, s.active)}>
      <NavLink to={path}> {name} </NavLink>
    </div>
  );
};
export default DialogItem;
