import React from 'react';
import styles from './ProfileInfo.module.css';
import avatarImg from '../../../pictures/avatarImg.png';
import Preloader from '../../Services/Preloader';
import { withAuThRedirect } from '../../../HOC/AuthRedirect';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import {  actions } from '../../../redux/profile-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusSelector, getUserInfo } from '../../../redux/profile-selectors';
import { UserOutlined } from '@ant-design/icons';



const ProfileInfo = ({isOwner}) => {
    
//state

    const userInfo = useSelector(getUserInfo);
    const status = useSelector(getStatusSelector);
    const isAuth = useSelector(state => state.authReducer.isAuth);
     
 
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

    if (!userInfo ) { return <Preloader />} 
    return (<div>

        {userInfo.photos.large
            ? <img alt='avatar' src={userInfo.photos.large} className={styles.avatar} />
            : <UserOutlined style={{ fontSize: '100px' }} />
        }
 

{/* change pgoto block */}
        <div>isOwner={+isOwner}, isAuth={+isAuth}</div>
        {      isOwner && 
            <input type='file' onChange={(e) => updateProfilePhotoOnChange(e)}/>}




            <div className={styles.text}> {userInfo.fullName ? userInfo.fullName : '' }</div>

            {/* <ProfileStatusWithHooks status={status} updateStatus={()=>dispatch(actions.updateStatus)}/> */}
            
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