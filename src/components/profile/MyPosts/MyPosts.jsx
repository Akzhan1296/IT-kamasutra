import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
//import {updateNewPostActionCreator, addPostActionCreator} from "../../../redux/profile-reducer"
const { postsBlock, postsWrap } = s;



const MyPosts = ({posts, newPostText, addPost, updateNewPostText}) => { 

  let postsElements = posts.map((post, index) => (
    <Post message={post.message} likeCount={post.likesCount} key={index} />
  ));

  let newPostElement = React.createRef(); //Здесь создаеться пустая ссылка Здесь возвращаеться {} с свойством current
  //когда ref задаем к нужному элементу тогда newPostElement будут ссылаться на нужный элемент 

  let onAddPost = () => {
    addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    updateNewPostText(text);
  //Кидаем на вверх к контей нерой компоненте 
  }  


  return (
    <div className={postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={newPostText}/>
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={postsWrap}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;


  //Логика такая => добавляем в state новое значение через  onPostChange
  // а потом addPost смотрит state и меняет как нужно 