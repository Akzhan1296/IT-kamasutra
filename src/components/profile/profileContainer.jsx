import React, { Component } from "react";
import Profile from "./profile";
import {
  getUsersProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.match.params.userId; //withRouter
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    this.props.getUsersProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.userId !== this.props.match.params.userId){
      this.refreshProfile();
    }
    
  }

  render() {
    return (
      <Profile
        // {...this.props}
        isOwner={!this.props.match.params.userId} // !! change to true 
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
      //this.props.profile => state.profilepage.profile  =>  profilePage: profileReducer,
    );
  }
}

const mapStateToProps = (state) => {
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
    saveProfile
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);

//если просто передать как объект MDTH то тогда connect сама обернет actionCreator в disptahc и передаст в store

//Мы сделали комментарий к withAuthRedirect для того чтобы любой человек смог посмотреть профиль

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps,{
//   getUsersProfile
// })(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
