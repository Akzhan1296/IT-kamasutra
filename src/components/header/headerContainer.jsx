import React, { Component } from "react";
import Header from "./header";
import {auth} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.auth(); //Использовали thunk

  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})
//эти данные из auth-reducer попадает в нашу компаненту

export default connect(mapStateToProps,{
  auth
})(HeaderContainer);
// короткая запись mapDispatchToProps

//Длинная запись была бы такой 

// const mapDispatchToProps = (dispatch) => {
//   return {
//     auth: () => {
//       return dispatch(auth)
//     }
//   }
// }