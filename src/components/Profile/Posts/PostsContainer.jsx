import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewTextActionCreator } from '../../../redux/profile-reducer';
import Posts from './Posts';


//  const PostsContainer = () => {

   
//      return (<StoreContext.Consumer>{(store) => {
    
    
//      let state = store.getState();


//      let addPost = () => {
//          store.dispatch(addPostActionCreator());
//      };


//      let onPostChange = (text) => {
//          store.dispatch(updateNewTextActionCreator(text));
//      };           return (

    
//      <Posts 
//          posts={state.profilePage.posts} 
//          addPost={addPost} 
//          onPostChange={onPostChange} 
//          newPostText={state.profilePage.newPostText}/>    
//      )
//      }}</StoreContext.Consumer>

//      )
//  }


const mapStateToProps = (state) => {
    return {
        posts:  state.profilePage.posts,
        newPostText: state.profilePage.newPostText  
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
        dispatch(addPostActionCreator());
        },
        
        onPostChange: (text) => {
        dispatch(updateNewTextActionCreator(text));
        }        

    }
};
const PostsContainer = connect(mapStateToProps, mapDispatchToProps) (Posts);


export default PostsContainer;