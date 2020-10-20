import React, { Component } from "react";
import Profile from "./profile";
import {
  getUsersProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PathParamsType = {
  userId: string;
};

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  OwnPropsType &
  RouteComponentProps<PathParamsType>;

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  getUsersProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
};

type OwnPropsType = {};

class ProfileContainer extends Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId; //withRouter
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if(!userId){
      console.error("ID should exists in URI params or in state ('authorizedUserId')");
    } else {
      this.props.getUsersProfile(userId);
      this.props.getStatus(userId);
    }


  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId} // !! change to true
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUsersProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);

//если просто передать как объект MDTH то тогда connect сама обернет actionCreator в disptahc и передаст в store

//Мы сделали комментарий к withAuthRedirect для того чтобы любой человек смог посмотреть профиль

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps,{
//   getUsersProfile
// })(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
