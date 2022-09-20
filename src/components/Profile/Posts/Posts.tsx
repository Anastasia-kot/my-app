import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore

import { getNewPostText, getPosts } from '../../../redux/profile-selectors.ts';
// @ts-ignore
import { Post } from './Post/Post.tsx';
// import styles from './Posts.module.css';

// @ts-ignore
import { actions, PostType } from '../../../redux/profile-reducer.ts';


export const Posts = ( ) => {
  
//state
    const posts: Array<PostType> = useSelector(getPosts);
    const newPostText: string = useSelector(getNewPostText);
 

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

