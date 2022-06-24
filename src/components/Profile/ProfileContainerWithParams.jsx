import React from 'react';
import { useParams } from "react-router-dom";
import ProfileContainer from './ProfileContainer';




const ProfileContainerWithParams = (props) =>  {
    
        let URLuserId = useParams().id;
    if (!URLuserId) { URLuserId = 23829}

    return <ProfileContainer URLuserId={URLuserId}  />
}

export default ProfileContainerWithParams;