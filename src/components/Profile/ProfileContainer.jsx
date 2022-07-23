import React, { PureComponent } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import { setUser, addPost, updateNewText, getUserData, 
    updateStatus, getStatus, updateProfilePhoto } from '../../redux/profile-reducer.ts';
import { getPosts, getNewPostText, getUserInfo, getStatusSelector } from '../../redux/profile-selectors';




class ProfileContainer extends PureComponent {
    isOwner = false;
    myId = null;
    
    refresh(){
        this.myId = this.props.URLuserId;
        if (!this.myId) { this.myId = this.props.id }


        this.props.getUserData(this.myId);
        this.props.getStatus(this.myId);
    }

    componentDidMount() {
       this.refresh()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.URLuserId !== prevProps.URLuserId) {
            debugger
            this.refresh()
        }

       
            
        //     this.myId = this.props.URLuserId;
        //     if (!this.myId) { this.myId = this.props.id }


        //     this.props.getUserData(this.myId);
        //     this.props.getStatus(this.myId);
            
        //     if (!this.props.URLuserId) { this.isOwner = true 
        //     } else {
        //         this.isOwner = false
        //     }
        // }
    }

    render() { return <Profile 
        posts={this.props.posts}
        newPostText={this.props.newPostText}
        userInfo={this.props.userInfo}
        isAuth={this.props.isAuth}
        status={this.props.status}
        isOwner={this.isOwner}

        
        addPost={this.props.addPost} 
        updateNewText={this.props.updateNewText} 
        updateStatus={this.props.updateStatus} 
        updateProfilePhoto={this.props.updateProfilePhoto}
        />
    }
}

let MapStateToProps = (state) => ({
    posts: getPosts(state),
    newPostText: getNewPostText(state),
    userInfo: getUserInfo(state),
    status: getStatusSelector(state),

    isAuth: state.authReducer.isAuth,
    id: state.authReducer.data.id,
});




export default connect(MapStateToProps, 
    { setUser, addPost, updateNewText, getUserData, updateStatus, getStatus, updateProfilePhoto })(ProfileContainer);