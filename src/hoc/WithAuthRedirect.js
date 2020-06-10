import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => {
  console.log(state.auth.isAuth)
    return {
      isAuth: state.auth.isAuth
    }
  }

export const withAuthRedirect = (Component) => {
    
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to='/login' />
            //this.props.isAuth === false
            return <Component {...this.props}/>
        }
    }
  //Вот здесь делаем первую обертку 

  
  let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
  //вот здесь делаем вторую обертку для того чтобы не повторять получения данных isAuth

    return ConnectedRedirectComponent
}