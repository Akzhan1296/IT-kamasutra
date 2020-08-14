import React from "react";
import s from "./profileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./profileStatusWithHooks";
import userPhoto from "../../../assets/imgs/userPhoto.jpg";
  

const ProfileInfo = ({ profile, status, updateStatus,isOwner,savePhoto }) => {
  if (!profile) {
    return <Preloader />;
  }

  const { descrBlock } = s;

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length){
     savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={descrBlock}>
        <img src={profile.photos.large || userPhoto} alt="profile" className={s.mainPhoto}/>
        {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
