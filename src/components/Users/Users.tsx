import React from 'react';
// @ts-ignore
import styles from './Users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Pagination } from 'antd';
// @ts-ignore
import { Preloader } from '../common/Preloader/Preloader.tsx';
// @ts-ignore
import { getUsersTC, User, actions, followUser, unFollowUser, setNewCurrentPage } from '../../redux/users-reducer.ts';
// @ts-ignore
import { getCount, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers } from '../../redux/users-selectors.ts';
// @ts-ignore
import { Avatar } from '../common/Avatar/Avatar.tsx';
    



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
        (newCurrentPage: number) => dispatch(setNewCurrentPage(newCurrentPage, count))
     ; 
    const onShowSizeChange = (current: number, pageSize: number) => {
            dispatch(actions.setUsersOnPageCount(pageSize))
            dispatch(setNewCurrentPage(1, pageSize))
    }; 

   

// follow - unfollow 
    const unFollowUserOnClick = React.useCallback (
        (id:number) => dispatch(unFollowUser(id)),
        [dispatch]
    ); 
    const followUserOnClick = React.useCallback (
        (id: number) => dispatch(followUser(id)),
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
                            <Avatar width={100} photos={u.photos}/>
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


 