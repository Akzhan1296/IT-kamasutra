import React from "react";
import Dialogs from "./dialogs";
import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogs-reducer";

import {connect} from "react-redux";

//Старая версия когда мы сами делали контейнерную компоненту
// const DialogsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState().dialogsPage;
        
//         const onSendMessageClick = () => {
//           store.dispatch(addMessageActionCreator());
//         };

//         const changeMessageTextArea = (text) => {
//           store.dispatch(updateNewMessageActionCreator(text));
//         };

//         return (
//           <Dialogs
//             updateNewMessageBoby={changeMessageTextArea}
//             dialogsPage={state}
//             sendMessage={onSendMessageClick}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

//данная функция сама обращается к store и получает state
//store.getState()

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}
// нужна для настройки callBack для функций 


//connect автоматом сам засунет dispatch 
//а именно store.dispatch.bind(store)
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBoby: (text) => {
      dispatch(updateNewMessageActionCreator(text));
    },
    sendMessage: () => {
      dispatch(addMessageActionCreator());
    }
  }
}
//настройка callBack 
const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);

//SuperDialogsContainer новая презентационная компонента
export default DialogsContainer;
