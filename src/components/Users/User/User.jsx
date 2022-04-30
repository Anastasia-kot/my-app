import React from 'react';
import styles from './User.module.css';


const User = (props) => {



    return (<div className={styles.userCard}>
        <img className={styles.avatar} 
                                        alt='avatar' src={props.avatar}/>
        <br/>
        {props.name} ', ' {props.address.city}
        <div>

            {props.isFollowed? <button>Unfollow</button> : <button>Follow</button>}
        </div>
    </div>
    );
}

export default User;

