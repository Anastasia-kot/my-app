import { Dispatch } from 'react';
import { followUserWithAPI, getUsersWithAPI, unfollowUserWithAPI } from "../API/api";
import { mappingFunction } from "../utils/mapHelper";

const FOLLOW = 'USERS-REDUCER/FOLLOW';
const UNFOLLOW = 'USERS-REDUCER/UNFOLLOW';
const SET_USERS = 'USERS-REDUCER/SET_USERS';
const SET_CURRENT_PAGE = 'USERS-REDUCER/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS-REDUCER/SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING_STATUS = 'USERS-REDUCER/SET_IS_FETCHING_STATUS';
const FOLLOWING_IN_PROGRESS = 'USERS-REDUCER/FOLLOWING_IN_PROGRESS';

type InitialStateType = typeof initialState;
type User = { 
    name: string | null, 
    id: number , 
    uniqueUrlName: null | string,
    photos: {
        large: null | string,
        small: null | string,
    }, 
    status: null | string, 
    followed: boolean}


let initialState =  {
    users: [] as Array<User>,
    totalCount: 0 as number,
    count: 5 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    
    followingInProgress: [] as Array<number>,
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
     switch (action.type) {

        case FOLLOW:  
            return {
                ...state,
                users: mappingFunction(state.users, action.userId, true)  
                
            };

         case UNFOLLOW:
            return {
                ...state,
                users: mappingFunction(state.users, action.userId, false) 
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
                followingInProgress: 
                    action.toggleFollowing   
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
            

        default: 
            return state;
    }
};



type ActionsTypes = FollowAT | UnFollowAT | SetUsersAT | SetCurrentPageAT | SetTotalUsersCountAT | SetIsFetchingStatusAT | SetFollowingInProgressAT;

type FollowAT = {
    type: typeof FOLLOW, 
    userId: number
}
export let follow = (userId: number): FollowAT => 
    ({ type: FOLLOW, userId });

type UnFollowAT = {
    type: typeof UNFOLLOW,
    userId: number
}
export let unFollow = (userId: number): UnFollowAT => 
    ({ type: UNFOLLOW, userId });

type SetUsersAT = {
    type: typeof SET_USERS,
    users: Array<User>
}
export let setUsers = (users: Array<User>): SetUsersAT => 
    ({ type: SET_USERS, users});

type SetCurrentPageAT = {
    type: typeof SET_CURRENT_PAGE,
    newCurrentPage: number
}
export let setCurrentPage = (newCurrentPage: number): SetCurrentPageAT => 
    ({ type: SET_CURRENT_PAGE, newCurrentPage});

type SetTotalUsersCountAT = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount: number
}
export let setTotalUsersCount = (totalCount: number): SetTotalUsersCountAT => 
    ({ type: SET_TOTAL_USERS_COUNT, totalCount });

type SetIsFetchingStatusAT = {
    type: typeof SET_IS_FETCHING_STATUS,
    isFetchingStatus: boolean
}
export let setIsFetchingStatus = (isFetchingStatus: boolean): SetIsFetchingStatusAT => 
    ({ type: SET_IS_FETCHING_STATUS, isFetchingStatus});

type SetFollowingInProgressAT = {
    type: typeof FOLLOWING_IN_PROGRESS,
    toggleFollowing: boolean,
    userId: number,
}
export let setFollowingInProgress = (userId: number, toggleFollowing: boolean): SetFollowingInProgressAT => 
    ({ type: FOLLOWING_IN_PROGRESS, userId, toggleFollowing,});


export const getUsersTC = (count:number, currentPage:number ) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setIsFetchingStatus(true));
        let response = await getUsersWithAPI(count, currentPage)
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setIsFetchingStatus(false));
    };
};

export const setNewCurrentPage = (newCurrentPage:number, count:number) => {
    return async(dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setCurrentPage(newCurrentPage));
        dispatch(setIsFetchingStatus(true));
        let response = await getUsersWithAPI(count, newCurrentPage);       
        dispatch(setUsers(response.items));
        dispatch(setIsFetchingStatus(false));
    }
};


export const toggleFollowUnfollow = (dispatch: Dispatch<ActionsTypes>, userId:number, apiMethod, callbackAC) => {
    dispatch(setFollowingInProgress(userId, true));
    apiMethod(userId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(callbackAC(userId))
            }
            dispatch(setFollowingInProgress(userId, false));
        })
}

export const unFollowUser = (userId:number) => (dispatch: Dispatch<ActionsTypes>) => {
    toggleFollowUnfollow(dispatch, userId, unfollowUserWithAPI, unFollow )
}
export const followUser = (userId: number) => (dispatch: Dispatch<ActionsTypes>) => {
    toggleFollowUnfollow(dispatch, userId, followUserWithAPI, follow)
}



export default usersReducer;