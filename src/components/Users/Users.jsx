import React from 'react';
import styles from './Users.module.css';
import avatarImg from '../../pictures/avatarImg.png';
import Preloader from '../Services/Preloader';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator';




const Users = React.memo((props) => {

    return (<div>

        <Paginator 
            totalCount={props.totalCount}
            count={props.count}
            currentPage={props.currentPage}
            setNewCurrentPage={props.setNewCurrentPage} 
            />

        {props.isFetching && <Preloader /> }

        {props.users.map(u => {
            return (
                <div key={u.id} className={styles.userCardContainer}>
                    <div className={styles.userCard}>
                        
                        <NavLink to={'/profile/' + u.id}> 
                            <img className={styles.avatar} alt='avatar' src={u.photos.small ? u.photos.small : avatarImg} /> 
                        </NavLink>
                        
                        <div className={styles.userInfoContainer}>
                            <div>
                                {u.name}
                            </div>
                            
                            <div>
                                    {u.followed
                                        ? <button 
                                            disabled = {props.followingInProgress.some(id => id===u.id)} 
                                            onClick={() => { props.unFollowUser(u.id) }}> Unfollow </button>
                                                                

                                        : <button 
                                            disabled={props.followingInProgress.some(id => id === u.id)} 
                                            onClick={() => { props.followUser(u.id) }}> Follow </button>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)

})


export default Users;