import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import { setUser, addPost, updateNewText, getUserData } from '../../redux/profile-reducer';




class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUserData(this.props.URLuserId);
    }

    render() { return <Profile 
        posts={this.props.posts}
        newPostText={this.props.newPostText}
        userInfo={this.props.userInfo}
        isAuth={this.props.isAuth}

        
        addPost={this.props.addPost} 
        updateNewText={this.props.updateNewText} 
        />
    }
}

let MapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    userInfo: state.profilePage.userInfo,
    isAuth: state.authReducer.isAuth
});




export default connect(MapStateToProps, { setUser, addPost, updateNewText, getUserData })(ProfileContainer);