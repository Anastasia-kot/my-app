import React from 'react';
import styles from './Users.module.css';


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


        {props.users.map(u => {
            return (
                <div key={u.id} className={styles.userCardContainer}>
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
            )
        })}
    </div>)

 }


export default Users;