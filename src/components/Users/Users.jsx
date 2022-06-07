import React from 'react';
import styles from './Users.module.css';
import avatarImg from '../../pictures/avatarImg.png';
import Preloader from '../Services/Preloader';
import { NavLink } from 'react-router-dom';
import axios from 'axios';




const Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.count);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {

        if (i <= 5 || i >= (pagesCount - 5)) { pages.push(i) }
    }

    
    return (<div>

        {pages.map(p => {
            return (
                <span key={p}
                    className={(p === props.currentPage) ? styles.selected : ''}
                    onClick={() => props.setNewCurrentPage(p)}> {p} </span>
            )
        })}

        {props.isFetching && <Preloader /> }

        {props.users.map(u => {
            return (
                <div key={u.id} className={styles.userCardContainer}>
                    <div className={styles.userCard}>
                        <NavLink to={'/profile/' + u.id}> <img className={styles.avatar} alt='avatar' src={u.photos.small ? u.photos.small : avatarImg} /> </NavLink>
                        <br />
                        {u.name}
                        <div>
                            {u.followed
                            ? <button onClick={() => 
                                    axios
                                        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            { withCredentials: true, headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' }})
                                        .then(response => {
                                            if (response.data.resultCode===0){ props.unFollowUser(u.id)}
                                    })
                            }> Unfollow </button>
                               

                            : <button onClick={() => 
                                    axios
                                        .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                            { withCredentials: true, headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' }} )
                                        .then(response => {
                                            if (response.data.resultCode === 0) { props.followUser(u.id) }
                                        })
                            
                            }> Follow </button>
                                
                                
                                
                                
                                }
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)

 }


export default Users;