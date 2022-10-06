import React from 'react';
// @ts-ignore

import styles from './Profile.module.css';
// @ts-ignore
import { Posts } from './Posts/Posts.tsx';
// @ts-ignore

import { ProfileInfo } from './ProfileInfo/ProfileInfo.tsx';
import { useSelector } from 'react-redux';
// @ts-ignore
import {  getUserData, getStatus } from '../../redux/profile-reducer.ts';
// @ts-ignore
import { getIsAuth, getAuthId } from '../../redux/auth-selectors.ts'
// '../../redux/auth-selectors.ts';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
  


export const Profile = React.memo(() => {

// state
 
    const id = useSelector(getAuthId);
    const isAuth = useSelector(getIsAuth);     
    const [isOwner, setIsOwner] = React.useState(false as boolean);    
    let URLuserId = useParams().id; 


// logic
    const dispatch = useDispatch();

    const refresh = () => {
        setIsOwner (false);
         
        if (URLuserId) { 
            dispatch(getUserData(URLuserId))
            dispatch(getStatus(URLuserId))
            if (+URLuserId === id) { setIsOwner(true) }
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
            {isOwner && <Posts />}
        </div>
    );
})

 