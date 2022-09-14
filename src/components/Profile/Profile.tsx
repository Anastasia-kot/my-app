import React from 'react';
import styles from './Profile.module.css';
// @ts-ignore
import Posts from './Posts/Posts.tsx';
// @ts-ignore
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import { useSelector } from 'react-redux';
// @ts-ignore
import {  getUserData, getStatus } from '../../redux/profile-reducer.ts';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
 


const Profile = React.memo(() => {

// state
 
    const id = useSelector(state => state.authReducer.data.id);
    const isAuth = useSelector(state => state.authReducer.isAuth);     
    const [isOwner, setIsOwner] = React.useState(false as boolean);    
    let URLuserId = useParams().id; 


// logic
    const dispatch = useDispatch();

    const refresh = () => {
        setIsOwner (false);
        console.log('URLuserId=',URLuserId)
        if (URLuserId) { 
            dispatch(getUserData(URLuserId))
            dispatch(getStatus(URLuserId)) 
                } else {
            dispatch(getUserData(id));
            dispatch(getStatus(id));
            setIsOwner(true);
                }     
    }

    React.useEffect( ( ) => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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