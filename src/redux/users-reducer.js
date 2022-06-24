import { followUserWithAPI, getUsersWithAPI, unfollowUserWithAPI } from "../API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING_STATUS = 'SET_IS_FETCHING_STATUS';

const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';


let initialState =  {
    users: [],
    totalCount: 0,
    count: 5,
    currentPage: 1,
    isFetching: false,
    
    followingInProgress: [],
};


const usersReducer = (state = initialState, action) => {
     switch (action.type) {

        case FOLLOW:  
            return {
                ...state,
                users: state.users.map(
                    u => { 
                        if (u.id === action.userId)  {return {...u, followed: true}   }; 
                        return u
                    }
                )
            };

         case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(
                    u => {
                        if (u.id === action.userId) { return { ...u, followed: false} }
                        return u
                    }
                )
            };
        
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };

        case SET_CURRENT_PAGE: 
            return {
                ...state, currentPage: action.newCurrentPage
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalCount: action.totalCount
            };
        
        case SET_IS_FETCHING_STATUS:
            return {
                ...state, isFetching: action.isFetchingStatus
            }

        case FOLLOWING_IN_PROGRESS: 
            return {
                ...state,
                followingInProgress: action.toggleFollowing   
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }
            

        default: 
            return state;
    }
};

export let follow = (userId) => ({ type: FOLLOW, userId });
export let unFollow = (userId) => ({ type: UNFOLLOW, userId });
export let setUsers = (users) => ({ type: SET_USERS, users});
export let setCurrentPage = (newCurrentPage) => ({ type: SET_CURRENT_PAGE, newCurrentPage});
export let setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
export let setIsFetchingStatus = (isFetchingStatus) => ({ type: SET_IS_FETCHING_STATUS, isFetchingStatus});
export let setFollowingInProgress = (userId, toggleFollowing) => ({ type: FOLLOWING_IN_PROGRESS, userId, toggleFollowing});


export const getUsersTC = (count, currentPage ) => (dispatch) => {
    dispatch(setIsFetchingStatus(true));
    getUsersWithAPI(count, currentPage)
        .then(response => {
            dispatch(setUsers(response.items));
            dispatch(setTotalUsersCount(response.totalCount));
            dispatch(setIsFetchingStatus(false));
        });
};

export const setNewCurrentPage = (newCurrentPage, count) => (dispatch) => {
    dispatch(setCurrentPage(newCurrentPage));
    dispatch(setIsFetchingStatus(true));
    getUsersWithAPI(count, newCurrentPage)
        .then(response => {
            dispatch(setUsers(response.items));
            dispatch(setIsFetchingStatus(false));
        });
};



export const unFollowUser = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(userId, true));
    unfollowUserWithAPI(userId)
        .then(response => {
            if (response.resultCode === 0) { 
                    dispatch(unFollow(userId)) }
            dispatch(setFollowingInProgress(userId, false));
    })
}
export const followUser = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(userId, true));
    followUserWithAPI(userId)
        .then(response => {
            if (response.resultCode === 0) { 
                    dispatch(follow(userId)) }
            dispatch(setFollowingInProgress(userId, false));
        })
}



export default usersReducer;