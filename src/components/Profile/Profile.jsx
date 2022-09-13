import React from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useSelector } from 'react-redux';
import {   getStatusSelector, getUserInfo } from '../../redux/profile-selectors';
import {  getUserData, getStatus, actions } from '../../redux/profile-reducer.ts';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";



const Profile = React.memo((props) => {

// state
 
    const id = useSelector(state => state.authReducer.data.id);
    
    let URLuserId = useParams().id; 
             
    let isOwner = false;
    let myId = null;


// logic
    const dispatch = useDispatch();

    const refresh = () => {
        myId = URLuserId;
        if (!myId) { 
            myId = id; 
            isOwner = true 
        }

        dispatch(getUserData(myId))
        dispatch(getStatus(myId))
    }

    React.useEffect( ( ) => {
        refresh()
    }, [id, myId, URLuserId]

    )
  
 


    return (
        <div className={styles.profile}>
            <ProfileInfo isOwner={isOwner} /> 
            <br /> <br /> 
            <Posts/>
        </div>
    );
})

export default Profile;