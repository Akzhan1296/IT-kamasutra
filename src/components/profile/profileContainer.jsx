import React, {Component} from "react";
import Profile from "./profile";
import {getUsersProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class ProfileContainer extends Component {

  componentDidMount(){
    let userId = this.props.match.params.userId; //withRouter
    if(!userId) {
      userId =2
    }
    
    this.props.getUsersProfile(userId)
  }

  render() {
     return (
        <Profile {...this.props} profile={this.props.profile} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{
  getUsersProfile
})(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
