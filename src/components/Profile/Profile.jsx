import React from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useSelector } from 'react-redux';
import {  getUserData, getStatus } from '../../redux/profile-reducer.ts';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
 


const Profile = React.memo(() => {

// state
 
    const id = useSelector(state => state.authReducer.data.id);
    
    const isAuth = useSelector(state => state.authReducer.isAuth);     
    let URLuserId = useParams().id; 
             
    let isOwner = false;
    let myId = null;


// logic
    const dispatch = useDispatch();

    const refresh = () => {
        isOwner = false;
        myId = URLuserId;
        console.log('myId=', myId)
        if (!myId) { 
            myId = id;
            isOwner = true  
        }

        dispatch(getUserData(myId))
        dispatch(getStatus(myId))
    }

    React.useEffect( ( ) => {
        refresh()
    }, [URLuserId, isAuth]

    )
  
 

    if (!isAuth) { return <Navigate to='/login' /> }
    return (
        <div className={styles.profile}>
            <ProfileInfo isOwner={isOwner} /> 
            <br /> <br /> 
            <Posts/>
        </div>
    );
})

export default Profile;