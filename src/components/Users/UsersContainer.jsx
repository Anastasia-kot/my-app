import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followAC, setUsersAC, unfollowAC } from '../../redux/users-reducer';






const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        usersCount: state.usersPage.usersCount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userID) => {
            dispatch(followAC(userID));
        },

        unFollowUser: (userID) => {
            dispatch(unfollowAC(userID));
        },

        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
    }
};


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
