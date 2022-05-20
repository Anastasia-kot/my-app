import React from 'react';
import * as axios from 'axios';
import styles from './Users.module.css';


const Users = (props) => {

    let loadUsers = () => {
        if (props.users.length === 0) { 
            axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => { props.setUsers(response.data.items)});
        };
    };

    
    let usersElements = props.users.map ( u => {return(
        <div key = {u.id}>
            <div className={styles.userCard}>
                <img className={styles.avatar} alt='avatar'
                    src={u.photos.small ? u.photos.small : 'https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png'} />
                <br />
                {u.name}
                <div>
                    {u.followed
                        ? <button onClick={() => props.unFollowUser(u.id)}> Unfollow </button>
                        : <button onClick={() => props.followUser(u.id)}>   Follow   </button>}
                </div>
            </div>
        </div>
    )});
        

    return (
        <div>
            {usersElements}
            <button onClick={loadUsers}> Load users </button>
        </div>
    );
};


export default Users;
