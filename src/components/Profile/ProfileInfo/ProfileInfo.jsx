import React from 'react';
import styles from './ProfileInfo.module.css';
import avatarImg from '../../../pictures/avatarImg.png';
import Preloader from '../../Services/Preloader';
 import { withAuThRedirect } from '../../../HOC/AuthRedirect';
// import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';



const ProfileInfo = (props) => {
    
    let updateProfilePhotoOnChange = (e) => {
        if (e.target.files.length) {
            props.updateProfilePhoto(e.target.files[0])
        }
    }; 


     if (!props.userInfo ) { return <Preloader />} 
        return (<div>
            <img className={styles.avatar} alt='user avatar' src={props.userInfo.photos.large ? props.userInfo.photos.large: avatarImg} />
            
            { <input type='file' onChange={(e) => updateProfilePhotoOnChange(e)}/>}

            <div className={styles.text}> {props.userInfo.fullName ? props.userInfo.fullName : '' }</div>

            <ProfileStatusWithHooks     status={props.status} updateStatus={props.updateStatus}/>
            
            <div className={styles.contacts_block}>
                <span className={styles.contacts_header}>My contacts: </span>
                <div className={styles.contact}> {props.userInfo.contacts.facebook ? `facebook: ${props.userInfo.contacts.facebook}` : ''}</div>
                <div className={styles.contact}> {props.userInfo.contacts.website ? `website: ${props.userInfo.contacts.website}` : ''}</div>
                <div className={styles.contact}> {props.userInfo.contacts.vk ? `vk: ${props.userInfo.contacts.vk}` : ''}</div>
                <div className={styles.contact}> { props.userInfo.contacts.twitter ? `twitter: ${props.userInfo.contacts.twitter}` : '' }</div >
                <div className={styles.contact}> { props.userInfo.contacts.instagram ? `instagram: ${props.userInfo.contacts.instagram}` : '' }</div >
                <div className={styles.contact}> { props.userInfo.contacts.youtube ? `youtube: ${props.userInfo.contacts.youtube}` : '' }</div >
                <div className={styles.contact}> { props.userInfo.contacts.github ? `github: ${props.userInfo.contacts.github}` : '' }</div >
                <div className={styles.contact}> { props.userInfo.contacts.mainLink ? `mainLink: ${props.userInfo.contacts.mainLink}` : '' }</div >
            </div>
            <div className={styles.text}>Работа: {props.userInfo.lookingForAJob 
                ? `я в поисках работы. (${props.userInfo.lookingForAJobDescription ? props.userInfo.lookingForAJobDescription : ''})` 
                : 'я трудоустроен'}</div>
        

        </div>);
    }

let AuthRedirectComponent = withAuThRedirect(ProfileInfo)

export default AuthRedirectComponent;