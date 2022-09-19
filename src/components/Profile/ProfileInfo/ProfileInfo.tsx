import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import styles from './ProfileInfo.module.css';
// @ts-ignore
import { Preloader } from '../../Services/Preloader.tsx';
import { ProfileStatusWithHooks } from './ProfileStatus/ProfileStatusWithHooks';
// @ts-ignore
import { updateProfilePhoto, UserInfoType } from '../../../redux/profile-reducer.ts';
// @ts-ignore
import { getUserInfo } from '../../../redux/profile-selectors.ts';
import { UserOutlined } from '@ant-design/icons';



export const ProfileInfo = ({isOwner}) => {
    
//state

    const userInfo: UserInfoType = useSelector(getUserInfo);
    
    const [isChangingPhoto, setIsChangingPhoto] = React.useState(false);    
    const [isLoadingPhoto, setIsLoadingPhoto] = React.useState(false);    

     
    const contacts:Array<any> = [];
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
            dispatch(updateProfilePhoto(e.target.files[0]))
            setIsLoadingPhoto(true)
            setIsChangingPhoto(false)

        }
    }; 

    React.useEffect(
       ()=>{
            setIsLoadingPhoto(false)
        }, [userInfo] 
    )

    if (!userInfo ) { return <Preloader />} 
    return (<div>


    <div className={styles.photoBlock}>
        <div onClick={() => setIsChangingPhoto(true)} >
            {userInfo.photos.large
                ? <img alt='avatar' src={userInfo.photos.large} className={styles.avatar} />
                : <UserOutlined style={{ fontSize: '100px' }} />
            }
        </div>

        {isOwner && isChangingPhoto &&
                <input type='file' onChange={(e) => updateProfilePhotoOnChange(e)}  />}
            {isLoadingPhoto && <Preloader/> }

    </div>


            <div className={styles.text}> {userInfo.fullName ? userInfo.fullName : '' }</div>

            <ProfileStatusWithHooks />
            
            <div className={styles.contacts_block}>
                <span className={styles.contacts_header}>My contacts: </span>
                {contacts}
            </div>
            <div className={styles.text}>Работа: {userInfo.lookingForAJob 
                ? `я в поисках работы. (${userInfo.lookingForAJobDescription ? userInfo.lookingForAJobDescription : ''})` 
                : 'я трудоустроен'}</div>
        </div>);
    }

 