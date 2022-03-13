import React from 'react';
import Post from './Post/Post';
// import styles from './Posts.module.css';


const Posts = (props) => {
  

    let postsElements = props.posts.map((p) => { return (<Post message={p.message} likeCounter={p.likeCounter} key={p.id}/>) });


    let newTextBody = props.newPostText;

    let onAddPost = () => {
        props.addPost();
     };


    let onPostChange = (e) => {
        let text = e.target.value;    
        props.onPostChange(text);
    };


    return (<div>
        <h3>my posts</h3>
        <div>
            <textarea  onChange={(e) => onPostChange(e)} value={newTextBody}/>
            <div>
                <button  onClick={ () => onAddPost()} >Send new post</button>
            </div>
        </div>
       
        {postsElements}

    </div>

    );
}

export default Posts;