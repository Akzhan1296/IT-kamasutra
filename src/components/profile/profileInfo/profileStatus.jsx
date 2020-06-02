import React, { Component } from "react";
import s from "./profileInfo.module.css";

class ProfileStatus extends Component {

  state = {
    editMode: false,
    status: this.props.status
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  //При создание методов через стрелочные функций
  //this не теряется
  //Если создать через классический метод  тогда нужно биндить в конструкторе

  deactivateEditMode = () => { 
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status); 
  };

  onStatusChange = (e) => {
    this.setState({status: e.currentTarget.value})
  }

  componentDidUpdate(prevProps, prevState) {
    debugger
    if(prevProps.status !==   this.props.status){
      this.setState({
        status: this.props.status
      })
    }
  } 
  
  render() {
    console.log("render")
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "-----"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input 
            onChange={this.onStatusChange}
            autoFocus={true} 
            onBlur={this.deactivateEditMode} 
            value={this.state.status} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
