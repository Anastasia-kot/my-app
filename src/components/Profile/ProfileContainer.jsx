import React, { PureComponent } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import { actions,   getUserData,    getStatus,   } from '../../redux/profile-reducer.ts';
import { getPosts, getNewPostText, getUserInfo, getStatusSelector } from '../../redux/profile-selectors.js';




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

       
            
    }

    render() { return <Profile 
     
        isOwner={this.isOwner}

        // addPost={this.props.addPost} 
        // updateNewText={this.props.updateNewText} 
        // updateStatus={this.props.updateStatus} 
        // updateProfilePhoto={this.props.updateProfilePhoto}
        />
    }
}

let MapStateToProps = (state) => ({
     
});




export default connect(MapStateToProps, 
    { actions,   getUserData,   getStatus,  })(ProfileContainer);