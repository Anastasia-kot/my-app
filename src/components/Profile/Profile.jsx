import React from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = React.memo((props) => {
    return (
        <div className={styles.profile}>
            <span><ProfileInfo 
                userInfo={props.userInfo} 
                isAuth={props.isAuth} 
                status={props.status}
                isOwner={props.isOwner}

                updateStatus={props.updateStatus}
                updateProfilePhoto={props.updateProfilePhoto}
                /></span>
            <span><Posts 
                posts={props.posts}
                newPostText={props.newPostText}
                addPost={props.addPost}
                updateNewText={props.updateNewText} 
            /></span>
        </div>
    );
})

export default Profile;