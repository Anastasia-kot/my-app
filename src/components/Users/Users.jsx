import React from 'react';
import styles from './Users.module.css';
import avatarImg from '../../pictures/avatarImg.png';
import Preloader from '../Services/Preloader';
import { NavLink } from 'react-router-dom';
import { followUserWithAPI, unfollowUserWithAPI } from '../../API/api';




const Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.count);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {

        if (i <= 5 || i >= (pagesCount - 5)) { pages.push(i) }
    }

    // console.log(props.followingInProgress)
    // debugger

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
    ? <button 
         disabled = {props.followingInProgress.some(id => id===u.id)} 
        onClick={() => {


        props.setFollowingInProgress(u.id, true); 
        unfollowUserWithAPI(u.id)
            .then(response => { 
                if (response.resultCode === 0) { props.unFollowUser(u.id) } 
                
                props.setFollowingInProgress(u.id, false)    
            })
    }}> Unfollow </button>
                               

    : <button 
         disabled={props.followingInProgress.some(id => id === u.id)} 
        onClick={() => {


        props.setFollowingInProgress(u.id, true);    
        followUserWithAPI(u.id) 
            .then(response => { 
                if (response.resultCode === 0) { props.followUser(u.id) } 
                
                props.setFollowingInProgress(u.id, false);    
            })
    }}> Follow </button>
}



                        </div>
                    </div>
                </div>
            )
        })}
    </div>)

 }


export default Users;