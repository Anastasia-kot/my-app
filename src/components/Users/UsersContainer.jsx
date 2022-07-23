import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {   followUser, unFollowUser, getUsersTC, setNewCurrentPage   } from '../../redux/users-reducer.ts';
import { getCount, getTotalCount, getUsers, getIsFetching, getFollowingInProgress, getCurrentPage } from '../../redux/users-selectors';
import Users from './Users';



class UsersContainer extends PureComponent {

    componentDidMount() {
        this.props.getUsersTC(this.props.count, this.props.currentPage);
    };


    render() {
        return <Users
            setNewCurrentPage={this.props.setNewCurrentPage}
            unFollowUser={this.props.unFollowUser}
            followUser={this.props.followUser}
            
            users={this.props.users}
            totalCount={this.props.totalCount}
            count={this.props.count}
            currentPage={this.props.currentPage}
            isFetching={this.props.isFetching} 
            followingInProgress={this.props.followingInProgress}
/>
    };
}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCount: getTotalCount(state),
        count: getCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};



export default UsersContainer = connect(mapStateToProps, 
    {followUser, unFollowUser, getUsersTC, setNewCurrentPage})(UsersContainer);
