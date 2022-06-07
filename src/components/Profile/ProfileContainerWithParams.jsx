import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import axios from 'axios';
import { setUser, addPost, updateNewText } from '../../redux/profile-reducer';
import { useParams } from "react-router-dom";
import ProfileContainer from './ProfileContainer';




const ProfileContainerWithParams = (props) =>  {
    
        let URLuserId = useParams().id;
    if (!URLuserId) { URLuserId = 23829}

    return <ProfileContainer URLuserId={URLuserId}  />
}

export default ProfileContainerWithParams;