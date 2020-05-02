import React, {Component} from "react";
import Profile from "./profile";
import {setUsers} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer"
import {withRouter} from "react-router-dom";


class ProfileContainer extends Component {

  componentDidMount(){
    let userId = this.props.match.params.userId; //withRouter
    this.props.setUsers(userId)
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
  setUserProfile,
  setUsers
})(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
