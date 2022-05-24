import React from 'react';
import styles from './Users.module.css';
import avatarImg from '../../pictures/avatarImg.png';
import Preloader from '../Services/Preloader';




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
                        <img className={styles.avatar} alt='avatar'  src={u.photos.small  ? u.photos.small : avatarImg } />
                        <br />
                        {u.name}
                        <div>
                            {u.followed
                                ? <button onClick={() => props.unFollowUser(u.id)}> Unfollow </button>
                                : <button onClick={() => props.followUser(u.id)}>   Follow   </button>}
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)

 }


export default Users;