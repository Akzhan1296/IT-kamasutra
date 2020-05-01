import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

//  

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi", likesCount: 12 },
        { id: 2, message: "how are u?", likesCount: 11 },
      ],
      newPostText: "lorem ipson",
    },
    dialogsPage: {
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
    },
    sidebar: {}
  },
  _CallSubscriber() {
    console.log("State is watching by methods");
  },


  subscribe(obverver) {
    this._CallSubscriber = obverver;
  },
  getState() {
    return this._state;
  },

  // addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0,
  //   };

  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this._CallSubscriber(this._state);
  // },

  // updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._CallSubscriber(this._state);
  // },

  // addMessage() {
  //   let newMessage = {
  //     id: 6,
  //     message: this._state.dialogsPage.newMessage,
  //   };
  //   this._state.dialogsPage.messages.push(newMessage);
  //   this._state.dialogsPage.newMessage = "";
  //   this._CallSubscriber(this._state);
  // },

  // updateNewMessageText(newMessage) {
  //   this._state.dialogsPage.newMessage = newMessage;
  //   this._CallSubscriber(this._state);
  // },


  dispatch(action){
    //action => this an object which contains a type
    //action = {}
    
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar , action);
    this._CallSubscriber(this._state);
    




    


  }
};





window.store = store;

export default store;
