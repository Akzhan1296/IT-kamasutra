import React from "react";
import s from "./profileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";

const ProfileInfo = (props) => {
  if(!props.profile){
    return <Preloader/> 
  }

  const {descrBlock} = s;
  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      </div>
      <div  className={descrBlock}>
        <img src={props.profile.photos.large}/>
        aba+descr
      </div>
    </div>
  );
};

export default ProfileInfo;
