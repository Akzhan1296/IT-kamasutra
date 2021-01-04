import React, { useState, ChangeEvent } from "react";
import s from "./profileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./profileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";

import userPhoto from "../../../assets/imgs/userPhoto.jpg";
import { ContactsType, ProfileType } from "../../../types/types";


type PropsType = {
  profile: ProfileType;
  status: string;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: ProfileType //(profile: ProfileType) => Promise<any>;
};  

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  isOwner,
  updateStatus,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);
  const { descrBlock } = s;

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
    //
  };

  return (
    <div>
      <div className={descrBlock}>
        <img
          src={profile.photos.large || userPhoto}
          alt="profile"
          className={s.mainPhoto}
        />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataFormReduxForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

// type ProfileDataPropsType = {
//   profile: ProfileType;
//   isOwner: boolean;
//   goToEditMode: () => void;
// };

// const ProfileData: React.FC<ProfileDataPropsType> = ({
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      <div>{isOwner && <button onClick={goToEditMode}>Edit </button>}</div>
      <div>
        <b>Full name</b> {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

// type ContactPropsType = {
//   contactTitle: string;
//   contactValue: string;
// };

//const Contact: React.FC<ContactPropsType> = ({

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
