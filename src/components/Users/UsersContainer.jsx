import React from 'react';
import { connect } from 'react-redux';
import { followUser, setCurrentPage, setIsFetchingStatus, setTotalUsersCount, setUsers, unFollowUser } from '../../redux/users-reducer';
import Users from './Users';
import * as axios from 'axios';
import { getUsersWithAPI } from '../../API/api';



class UsersContainer extends React.Component {

    componentDidMount() {

        getUsersWithAPI(this.props.count, this.props.currentPage)
                .then(response => {
                this.props.setUsers(response.items);
                this.props.setTotalUsersCount(response.totalCount);
            });
    };


    setNewCurrentPage = (newCurrentPage) => {
        this.props.setCurrentPage(newCurrentPage);
        this.props.setIsFetchingStatus(true);

        getUsersWithAPI(this.props.count, this.props.currentPage)
            .then( response => { 
                this.props.setUsers(response.items);
                this.props.setIsFetchingStatus(false) 
            });
    };


    render() {
        return <Users
            setNewCurrentPage={this.setNewCurrentPage}
            totalCount={this.props.totalCount}
            count={this.props.count}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unFollowUser={this.props.unFollowUser}
            followUser={this.props.followUser}
            isFetching={this.props.isFetching} />
    };
}


const mapStateToProps = (state) => {
    return {
        users:      state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        count:       state.usersPage.count,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
};



export default UsersContainer = connect(mapStateToProps, 
        {followUser, unFollowUser, setUsers, setCurrentPage, 
            setTotalUsersCount, setIsFetchingStatus })(UsersContainer);
