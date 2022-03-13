import React from 'react';
import styles from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return ( <div>
        <img className={styles.avatar} alt='my avatar' src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfh2xI2oLk5L9xCtCa1PiwgqrVcbFH4sbV5g&usqp=CAU`}/>
            <div className={styles.text}>Some text about me</div>
        </div>
    
    );
}

export default ProfileInfo;