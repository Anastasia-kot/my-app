import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPostText, getPosts } from '../../../redux/profile-selectors';
import Post from './Post/Post';
// import styles from './Posts.module.css';
import {actions } from '../../../redux/profile-reducer.ts';


const Posts = ( ) => {
  
//state
    const posts = useSelector(getPosts);
    const newPostText = useSelector(getNewPostText);
 

// logic
    const dispatch = useDispatch();

    

    let onPostChange = (e) => {  
        dispatch(actions.updateNewText(e.target.value))
    };

    let onAddPost = ( ) => {  
        dispatch(actions.addPost())
    };


    return (<div>
        <h3>my posts</h3>
        <div>
            <textarea onChange={(e) => onPostChange(e)} value={newPostText}/>
            <div>
                <button onClick={() => onAddPost()} >Send new post</button>
            </div>
        </div>
       
        {posts.map( (p) => {
            return <Post message={p.message} likeCounter={p.likeCounter} key={p.id} />
        })}

    </div>

    );
}

export default Posts;