import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from './Users.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Pagination } from 'antd';
import { Preloader } from '../Services/Preloader.tsx';

import { getUsersTC, User, actions, followUser, unFollowUser, setNewCurrentPage } from '../../redux/users-reducer.ts';
import { getCount, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers } from '../../redux/users-selectors.ts';
    



export const Users: React.FC = ( ) => {

    const count: number = useSelector(getCount);
    const users: Array<User> = useSelector(getUsers);
    const totalCount: number = useSelector(getTotalCount);
    const currentPage: number = useSelector(getCurrentPage);
    const isFetching: boolean = useSelector(getIsFetching);
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress);


    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUsersTC(count, currentPage));
    }, [dispatch, count, currentPage])


    //paginator logic
    const setNewCurrentPageOnClick = 
        (newCurrentPage) => dispatch(setNewCurrentPage(newCurrentPage, count))
     ; 
    const onShowSizeChange = (current, pageSize) => {
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


    return ( <div>
        
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
                            <div className={styles.avatar}> 
                            {u.photos.small
                                ? <img   alt='avatar' src={u.photos.small} /> 
                                : <UserOutlined   style={{ fontSize: '100px',}} />
                            }
                            </div>
                        </NavLink>
                        
                        <div className={styles.userInfoContainer}>
                            <div>
                                {u.name} {u.id}
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


 