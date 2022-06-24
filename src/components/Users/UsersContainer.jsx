import React from 'react';
import { connect } from 'react-redux';
import {
    followUser, unFollowUser, getUsersTC, setNewCurrentPage   } from '../../redux/users-reducer';
import Users from './Users';



class UsersContainer extends React.Component {

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
        users:      state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        count:       state.usersPage.count,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};



export default UsersContainer = connect(mapStateToProps, 
    {followUser, unFollowUser, getUsersTC, setNewCurrentPage})(UsersContainer);
