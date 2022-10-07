import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import styles from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatusWithHooks } from './ProfileStatus/ProfileStatusWithHooks';
import { updateProfilePhoto, UserInfoType } from '../../../redux/profile-reducer';
import { getUserInfo } from '../../../redux/profile-selectors';
import { Avatar } from '../../common/Avatar/Avatar';


type Props = {
    isOwner:boolean
}
export const ProfileInfo: React.FC<Props> = ({isOwner}) => {
    
//state

    const userInfo: UserInfoType = useSelector(getUserInfo);
    const userContacts = userInfo.contacts;
    const [isChangingPhoto, setIsChangingPhoto] = React.useState(false);    
    const [isLoadingPhoto, setIsLoadingPhoto] = React.useState(false);    

     
    let contacts:Array<any> = [];
    for (let key in userContacts) {
        // @ts-ignore

        if ( userContacts[key] ) {
            contacts.push(
                <div className={styles.contact} key={contacts.length}>
                    
                    {// @ts-ignore
                    `${key}: ${userContacts[key]}`}
                </div>)
        }
      
    }

// logic
    const dispatch = useDispatch();

    let updateProfilePhotoOnChange = (e: any) => {
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
            <Avatar width={100} photos={userInfo.photos}/>  
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

 