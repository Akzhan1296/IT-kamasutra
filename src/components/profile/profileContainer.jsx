import React, {Component} from "react";
import Profile from "./profile";
import * as axios from "axios";
import { connect } from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer"
import {withRouter} from "react-router-dom";


class ProfileContainer extends Component {

  componentDidMount(){
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = 2;
    }
    axios
    .get(
      `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
    )
    .then((response) => { 

      this.props.setUserProfile(response.data);
      //мы задаем данные из api в setusers
    }); 
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
  setUserProfile
})(WithUrlDataContainerComponent)

//ProfileContainer => контейнерная компоненте для profile
