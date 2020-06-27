import React, { Component } from "react";
import Header from "./header";
import {auth,logout} from "../../redux/auth-reducer";
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
  auth,
  logout
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

//комментарий от 68 урока 
//У нас здесь есть контейнерная компонента headerContainer которая делает запрос на сервер
// а потом мы headerContainer оборачиваем еще одной контейнерной компонентой которая делает connect 
//это сделано для того чтобы мы могли получать данные из redux