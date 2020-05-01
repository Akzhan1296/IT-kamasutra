import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost,updateNewPostText, updateNewMessageText,addMessage} from './redux/state';


export const renderTree = (state) => {
    ReactDOM.render(<App state = {state} 
                         addPost={addPost} 
                         updateNewPostText={updateNewPostText} 
                         updateNewMessageText={updateNewMessageText}
                         addMessage={addMessage}/>, 
        document.getElementById('root'));
}



