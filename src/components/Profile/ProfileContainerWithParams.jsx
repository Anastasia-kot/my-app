import React from 'react';
import { useParams } from "react-router-dom";
import ProfileContainer from './ProfileContainer';




const ProfileContainerWithParams = (props) =>  {
    
    let URLuserId = useParams().id;

    return <ProfileContainer URLuserId={URLuserId}  />
}

export default ProfileContainerWithParams;