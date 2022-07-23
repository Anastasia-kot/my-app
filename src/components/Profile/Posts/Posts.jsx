import React from 'react';
import Post from './Post/Post';
// import styles from './Posts.module.css';


const Posts = (props) => {
  
    let postsElements = props.posts.map((p) => { 
        return (
            <Post message={p.message} likeCounter={p.likeCounter} key={p.id}/>
        )
    });

    let newTextBody = props.newPostText;

    let onPostChange = (e) => {
        let text = e.target.value;    
        props.updateNewText(text);
    };


    return (<div>
        <h3>my posts</h3>
        <div>
            <textarea  onChange={(e) => onPostChange(e)} value={newTextBody}/>
            <div>
                <button onClick={() => props.addPost()} >Send new post</button>
            </div>
        </div>
       
        {postsElements}

    </div>

    );
}

export default Posts;