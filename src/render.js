import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost,updateNewPostText, updateNewMessageText,addMessage} from './redux/state';


//эта функция была когда мы делали свой redux
// на данный момент она не нужна

export const renderTree = (state) => {
    ReactDOM.render(<App state = {state} 
                         addPost={addPost} 
                         updateNewPostText={updateNewPostText} 
                         updateNewMessageText={updateNewMessageText}
                         addMessage={addMessage}/>, 
        document.getElementById('root'));
}



