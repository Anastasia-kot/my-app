import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Users.module.css';
import { Pagination } from 'antd';

import Preloader from '../Services/Preloader';
import Paginator from '../common/Paginator.tsx';
import avatarImg from  '../../pictures/avatarImg.png';

import { getUsersTC, User, actions, followUser, unFollowUser, setNewCurrentPage } from '../../redux/users-reducer.ts';
import { getCount, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers } from '../../redux/users-selectors.js';
    
import {   UserOutlined } from '@ant-design/icons';



const Users: React.FC = ( ) => {

    const count = useSelector(getCount);
    const users = useSelector(getUsers);
    const totalCount = useSelector(getTotalCount);
    const currentPage = useSelector(getCurrentPage);
    const isFetching = useSelector(getIsFetching);
    const followingInProgress = useSelector(getFollowingInProgress);


    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUsersTC(count, currentPage));
    }, [])


    //paginator logic
    const setNewCurrentPageOnClick = 
        (newCurrentPage) => dispatch(setNewCurrentPage(newCurrentPage, count))
     ; 
    const onShowSizeChange = (current, pageSize) => {
            console.log(current, pageSize);
            dispatch(actions.setUsersOnPageCount(pageSize))
            dispatch(setNewCurrentPage(1, pageSize))
    }; 

   

// follow - unfollow 
    const unFollowUserOnClick = React.useCallback (
        (id) => dispatch(unFollowUser(id)),
        [dispatch]
    ); 
    const followUserOnClick = React.useCallback (
        (id) => dispatch(followUser(id)),
        [dispatch]
    ); 

   


    return (<div>
        <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={currentPage}
            total={totalCount} 
            onChange={setNewCurrentPageOnClick}
        />
         

        {isFetching && <Preloader /> }

        {users.map( (u: User) => {
            return (
                <div key={u.id} className={styles.userCardContainer}>
                    <div className={styles.userCard}>
                        
                        <NavLink to={'/profile/' + u.id}> 
                            {u.photos.small
                                ? <img className={styles.avatar} alt='avatar' src={u.photos.small} /> 
                                : <UserOutlined style={{ fontSize: '50px', color: 'black', width: '60px', height:'60px' }} />
                            }
                           
                        </NavLink>
                        
                        <div className={styles.userInfoContainer}>
                            <div>
                                {u.name}
                            </div>
                            
                            <div>
                                 <button
                                    disabled={followingInProgress.some(id => id === u.id)}
                                    onClick={() => { 
                                        u.followed ? unFollowUserOnClick(u.id) : followUserOnClick(u.id)
                                    }}>
                                        {u.followed ? 'Unfollow' :'Follow' }
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)

}


export default Users;