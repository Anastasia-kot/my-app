import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import axios from 'axios';
import { setUser, addPost, updateNewText } from '../../redux/profile-reducer';
import { getUserDataWithAPI } from '../../API/api';




class ProfileContainer extends React.Component {
    componentDidMount() {
    
        getUserDataWithAPI(this.props.URLuserId)
            .then (response => { 
                this.props.setUser(response) 
            })
    }

    render() { return <Profile 
        posts={this.props.posts}
        newPostText={this.props.newPostText}
        userInfo={this.props.userInfo}
        addPost={this.props.addPost} 
        updateNewText={this.props.updateNewText} 
        />
    }
}

let MapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    userInfo: state.profilePage.userInfo,
});




export default connect(MapStateToProps, { setUser, addPost, updateNewText })(ProfileContainer);