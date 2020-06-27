import React, {Component} from "react";
import Profile from "./profile";
import {getUsersProfile, getStatus,updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";



class ProfileContainer extends Component {

  componentDidMount(){
    let userId = this.props.match.params.userId; //withRouter
    if(!userId) {
      userId = this.props.authorizedUserId
    }
    
    this.props.getUsersProfile(userId);
    this.props.getStatus(userId)
  }

  render() {

     return (
        <Profile {...this.props} 
        profile={this.props.profile}
        status={this.props.status} 
        updateStatus={this.props.updateStatus}/> 
        //this.props.profile => state.profilepage.profile  =>  profilePage: profileReducer,
    );
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  }
}


export default compose(
  connect(mapStateToProps,{
    getUsersProfile,getStatus,updateStatus
  }),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)

//если просто передать как объект MDTH то тогда connect сама обернет actionCreator в disptahc и передаст в store

//Мы сделали комментарий к withAuthRedirect для того чтобы любой человек смог посмотреть профиль 


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps,{
//   getUsersProfile
// })(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
