import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import axios from 'axios';
import { setUser, addPost, updateNewText } from '../../redux/profile-reducer';




class ProfileContainer extends React.Component {
    componentDidMount(){
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.URLuserId}`)
            .then (response => {
                this.props.setUser(response.data);
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