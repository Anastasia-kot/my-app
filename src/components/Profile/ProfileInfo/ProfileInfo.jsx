import React from 'react';
import styles from './ProfileInfo.module.css';
import avatarImg from '../../../pictures/avatarImg.png';
import Preloader from '../../Services/Preloader';
import { withAuThRedirect } from '../../../HOC/AuthRedirect';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import {  actions } from '../../../redux/profile-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusSelector, getUserInfo } from '../../../redux/profile-selectors';
import { Navigate } from 'react-router-dom';



const ProfileInfo = ({isOwner}) => {
    
//state

    const userInfo = useSelector(getUserInfo);
    const status = useSelector(getStatusSelector);
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const id = useSelector(state => state.authReducer.data.id);
     
 
    const contacts = [];
    for (let key in userInfo.contacts) {
        contacts.push(
            <div className={styles.contact} key={contacts.length}>
                {userInfo.contacts[key] && `${key}: ${userInfo.contacts[key]}`}
            </div>)
    }

// logic
    const dispatch = useDispatch();

    let updateProfilePhotoOnChange = (e) => {
        if (e.target.files.length) {
            dispatch(actions.updateProfilePhoto(e.target.files[0]))
        }
    }; 

    // if (!isAuth) { <Navigate to='/login'/>}
    if (!userInfo ) { return <Preloader />} 
    return (<div>
            <img className={styles.avatar} alt='user avatar' src={userInfo.photos.large ? userInfo.photos.large: avatarImg} />
            
            {
            // isOwner && 
            <input type='file' onChange={(e) => updateProfilePhotoOnChange(e)}/>}

            <div className={styles.text}> {userInfo.fullName ? userInfo.fullName : '' }</div>

        <ProfileStatusWithHooks status={status} updateStatus={()=>dispatch(actions.updateStatus)}/>
            
            <div className={styles.contacts_block}>
                <span className={styles.contacts_header}>My contacts: </span>
                {contacts}
            </div>
            <div className={styles.text}>Работа: {userInfo.lookingForAJob 
                ? `я в поисках работы. (${userInfo.lookingForAJobDescription ? userInfo.lookingForAJobDescription : ''})` 
                : 'я трудоустроен'}</div>
        </div>);
    }

// let AuthRedirectComponent = withAuThRedirect(ProfileInfo)

export default ProfileInfo;