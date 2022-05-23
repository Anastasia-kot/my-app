import React from 'react';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unFollowAC } from '../../redux/users-reducer';
import Users from './Users';
import * as axios from 'axios';



class UsersContainer extends React.Component {

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.count}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    };


    setNewCurrentPage = (newCurrentPage) => {
        this.props.setCurrentPage(newCurrentPage);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.count}&page=${newCurrentPage}`)
            .then(response => { this.props.setUsers(response.data.items) });
    };


    render() {
        return <Users
            setNewCurrentPage={this.setNewCurrentPage}
            totalCount={this.props.totalCount}
            count={this.props.count}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unFollowUser={this.props.unFollowUser}
            followUser={this.props.followUser} />
    };
}


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
        setCurrentPage: (newCurrentPage) => {
            dispatch(setCurrentPageAC(newCurrentPage));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },

    }
};

export default UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
