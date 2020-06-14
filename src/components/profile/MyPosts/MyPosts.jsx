import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
//import {updateNewPostActionCreator, addPostActionCreator} from "../../../redux/profile-reducer"
import { Field, reduxForm } from "redux-form";

const { postsBlock, postsWrap } = s;

const maxLength10 = maxLengthCreator(10);

const MyPosts = ({ posts, newPostText, addPost, updateNewPostText }) => {
  let postsElements = posts.map((post, index) => (
    <Post message={post.message} likeCount={post.likesCount} key={index} />
  ));

  //до 76 был но потом убрали
  //let newPostElement = React.createRef(); //Здесь создаеться пустая ссылка Здесь возвращаеться {} с свойством current
  //когда ref задаем к нужному элементу тогда newPostElement будут ссылаться на нужный элемент

  let onAddPost = (values) => {
    addPost(values.newPostText);
  };

  return (
    <div className={postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={postsWrap}>{postsElements}</div>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          validate={[required, maxLength10]}
          placeholder="Post message"
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

let AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;

//Логика такая => добавляем в state новое значение через  onPostChange
// а потом addPost смотрит state и меняет как нужно
