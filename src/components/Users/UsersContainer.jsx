import React from 'react';
import { connect } from 'react-redux';
import { followUser, setCurrentPage, setIsFetchingStatus, setTotalUsersCount, 
    setUsers, unFollowUser, setFollowingInProgress } from '../../redux/users-reducer';
import { getUsersWithAPI } from '../../API/api';
import Users from './Users';



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
            unFollowUser={this.props.unFollowUser}
            followUser={this.props.followUser}
            setFollowingInProgress={this.props.setFollowingInProgress}

            
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
        {followUser, unFollowUser, setUsers, setCurrentPage, 
            setTotalUsersCount, setIsFetchingStatus, setFollowingInProgress })(UsersContainer);
