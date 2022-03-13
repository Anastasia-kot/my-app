import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = () => {

    return (
        <div className={styles.profile}>
            <img className={styles.profileDesktopPicture} alt='mood graphic' src='https://st.depositphotos.com/2016173/4374/i/950/depositphotos_43746993-stock-photo-venice-cityscape-narrow-water-canal.jpg' />
            <ProfileInfo />
            <PostsContainer />
        </div>
    );
}

export default Profile;