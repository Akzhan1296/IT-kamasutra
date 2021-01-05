import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
import AddNewPostForm from "./AddPostForm/AddPostForm";
import { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType } from "../../../types/types";

const { postsBlock, postsWrap } = s;

export type MapPropsType = {
  posts: Array<PostType>;
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};



const MyPosts: React.FC<MapPropsType & DispatchPropsType> = ({ posts, addPost }) => {
  let postsElements = posts.map((post, index) => (
    <Post message={post.message} likeCount={post.likesCount} key={index} />
  ));

  let onAddPost = (values: AddPostFormValuesType) => {
    addPost(values.newPostText);
  };
  return (
    <div className={postsBlock}>
      <h3>My posts</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={postsWrap}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;

//PURE COMPONENT
// class MyPosts extends PureComponent {
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   return nextProps !== this.props || nextState !== this.state;
//   // }
//   render() {
//     let postsElements = this.props.posts.map((post, index) => (
//       <Post message={post.message} likeCount={post.likesCount} key={index} />
//     ));

//     let onAddPost = (values) => {
//       this.props.addPost(values.newPostText);
//     };
//     return (
//       <div className={postsBlock}>
//         <h3>My posts</h3>
//         <AddNewPostFormRedux onSubmit={onAddPost} />
//         <div className={postsWrap}>{postsElements}</div>
//       </div>
//     );
//   }

//   //до 76 был но потом убрали
//   //let newPostElement = React.createRef(); //Здесь создаеться пустая ссылка Здесь возвращаеться {} с свойством current
//   //когда ref задаем к нужному элементу тогда newPostElement будут ссылаться на нужный элемент
// }

// const AddNewPostForm = (props) => {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <div>
//         <Field
//           name="newPostText"
//           component={TextArea}
//           validate={[required, maxLength10]}
//           placeholder="Post message"
//         />
//       </div>
//       <div>
//         <button>Add post</button>
//       </div>
//     </form>
//   );
// };

// let AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
//   AddNewPostForm
// );

//Логика такая => добавляем в state новое значение через  onPostChange
// а потом addPost смотрит state и меняет как нужно
