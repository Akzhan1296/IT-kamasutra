import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/profileInfo";
import s from "./profile.module.css";

import {ProfileType} from "../../types/types"


 
type Propstype = {
  savePhoto: (file: File) => void,
  saveProfile: (profile: ProfileType) => Promise<any>,
  updateStatus: (status: string) => void
  isOwner: boolean,
  profile: ProfileType | null,
  status: string,
  
}

const Profile:React.FC<Propstype> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
