const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "how are u?" },
    { id: 3, message: "yo" },
    { id: 4, message: "yo" },
    { id: 5, message: "yo" },
  ],
  dialogs: [
    { id: 1, name: "Akzhan" },
    { id: 2, name: "Akzhan2" },
    { id: 3, name: "Akzhan3" },
    { id: 4, name: "Akzhan4" },
    { id: 5, name: "Akzhan5" },
    { id: 6, name: "Akzhan6" },
  ],
  newMessage: "Write the new message",
};

const dialogsReducer = (state = initialState, action) => {
  // let stateCopy = {...state};
  //   stateCopy.messages = [...state.messages];

  //   let stateCopy = {...state,
  //     messages: [...state.messages]
  //  };  //одно и тоже с коментом но написали в одну стрончку

  switch (action.type) {
    
    case ADD_MESSAGE:
      console.log(state);
      let body = state.newMessage;
      return {
        ...state,
        newMessage: "", // здесь сверху перезаписываем newmessage;
        messages: [...state.messages, { id: 6, message: body }],
      }; 

    case UPDATE_NEW_MESSAGE_TEXT:
      return { ...state, newMessage: action.newMessage }; 
      //здесь мы делаем поверх копию так как мы меняем текс
      //текст является примитивом
      // мы сразу написали newMessage вместе спред чтобы перезаписать newMessage

    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMessage: text,
});

export default dialogsReducer;
