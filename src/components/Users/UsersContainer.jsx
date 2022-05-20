import React from 'react';
import Users from './UsersClass';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unFollowAC } from '../../redux/users-reducer';



const mapStateToProps = (state) => {
    return {
        users:      state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        count:       state.usersPage.count,
        currentPage: state.usersPage.currentPage  
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => {
            dispatch(followAC(userId));
        },

        unFollowUser: (userId) => {
            dispatch(unFollowAC(userId));
        },

        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },

    }
};


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
