import React from "react";
import {
  actions,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import {MapPropsType, DispatchPropsType} from "./MyPosts"


//Свой вариант создания контейнера
// const MyPostsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };

//         let onPostChange = (text) => {
//           store.dispatch(updateNewPostActionCreator(text));
//         };
//         return (
//           <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             posts={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
   
  }
}
 
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostText) => {
//       dispatch(actions.addPostActionCreator(newPostText));
//     }
//   }
// }

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
