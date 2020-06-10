const SEND_MESSAGE = "SEND_MESSAGE";


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
 
};

const dialogsReducer = (state = initialState, action) => {
  // let stateCopy = {...state};
  //   stateCopy.messages = [...state.messages];

  //   let stateCopy = {...state,
  //     messages: [...state.messages]
  //  };  //одно и тоже с коментом но написали в одну стрончку

  switch (action.type) {
    
    case SEND_MESSAGE:
      let body = action.newMessage;
      return {
        ...state,
  
        messages: [...state.messages, { id: 6, message: body }],
      }; 

    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessage) => ({ type: SEND_MESSAGE,newMessage });


export default dialogsReducer;
