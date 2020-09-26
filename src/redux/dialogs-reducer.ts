const SEND_MESSAGE = "SEND_MESSAGE";

type Dialog = {
  id: number,
  name: string
}

type Message = {
  id: number,
  message: string
}

let initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "how are u?" },
    { id: 3, message: "yo" },
    { id: 4, message: "yo" },
    { id: 5, message: "yo" },
  ] as Array<Message>,
  dialogs: [
    { id: 1, name: "Akzhan" },
    { id: 2, name: "Akzhan2" },
    { id: 3, name: "Akzhan3" },
    { id: 4, name: "Akzhan4" },
    { id: 5, name: "Akzhan5" },
    { id: 6, name: "Akzhan6" },
  ] as Array<Dialog>,

};

export type InitialStateType = typeof initialState


const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  // let stateCopy = {...state};
  //   stateCopy.messages = [...state.messages];

  //   let stateCopy = {...state,
  //     messages: [...state.messages]
  //  };  //одно и тоже с коментом но написали в одну стрончку

  switch (action.type) {

    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,

        messages: [...state.messages, { id: 6, message: body }],
      };

    default:
      return state;
  }
};

type sendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessageActionCreator = (newMessageBody: string): sendMessageActionCreatorType => ({ type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;
