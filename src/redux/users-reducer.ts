import { InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
// @ts-ignore
import { usersAPI } from "../API/api.ts";
import { mappingFunction } from "../utils/mapHelper";

 


let initialState = {
    users: [] as Array<User>,
    totalCount: 0 as number,
    count: 10 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case  'USERS-REDUCER/FOLLOW':
            return {
                ...state,
                users: mappingFunction(state.users, action.userId, true)

            };

        case 'USERS-REDUCER/UNFOLLOW':
            return {
                ...state,
                users: mappingFunction(state.users, action.userId, false)
            };

        case 'USERS-REDUCER/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };

        case 'USERS-REDUCER/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.newCurrentPage
            };

        case 'USERS-REDUCER/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalCount: action.totalCount
            };
        case 'USERS-REDUCER/SET_USERS_ON_PAGE_COUNT':
            return {
                ...state, count: action.count
            };

        case 'USERS-REDUCER/SET_IS_FETCHING_STATUS':
             return {
                ...state, isFetching: action.isFetchingStatus
             }

        case 'USERS-REDUCER/FOLLOWING_IN_PROGRESS':
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


type ActionsTypes = InferActionsTypes<typeof actions> 

export const actions = {
    follow: (userId: number) => ({ type: 'USERS-REDUCER/FOLLOW', userId } as const),
    unFollow: (userId: number) => ({ type: 'USERS-REDUCER/UNFOLLOW', userId } as const),
    setFollowingInProgress: (userId: number, toggleFollowing: boolean) =>
        ({ type: 'USERS-REDUCER/FOLLOWING_IN_PROGRESS', userId, toggleFollowing, } as const), 

    setIsFetchingStatus: (isFetchingStatus: boolean) => ({ type: 'USERS-REDUCER/SET_IS_FETCHING_STATUS', isFetchingStatus } as const),
    setUsers: (users: Array<User>) => ({ type: 'USERS-REDUCER/SET_USERS', users } as const),

    setCurrentPage: (newCurrentPage: number) => ({ type: 'USERS-REDUCER/SET_CURRENT_PAGE', newCurrentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'USERS-REDUCER/SET_TOTAL_USERS_COUNT', totalCount } as const),
    setUsersOnPageCount: (count: number) => ({ type: 'USERS-REDUCER/SET_USERS_ON_PAGE_COUNT', count } as const), 
}




export const getUsersTC = (count: number, currentPage: number) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setIsFetchingStatus(true));
        let response = await usersAPI.getUsersWithAPI(count, currentPage)
        // if (response?.items) {
            dispatch(actions.setUsers(response?.items));
            dispatch(actions.setTotalUsersCount(response?.totalCount));
        // }
        dispatch(actions.setIsFetchingStatus(false));
    };
};

export const setNewCurrentPage = (newCurrentPage: number, count: number ) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setCurrentPage(newCurrentPage));
        dispatch(actions.setIsFetchingStatus(true));
        let response = await usersAPI.getUsersWithAPI(count, newCurrentPage);
        dispatch(actions.setUsers(response?.items));
        dispatch(actions.setIsFetchingStatus(false));
    }
};


const _toggleFollowUnfollow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod, callbackAC) => {
    dispatch(actions.setFollowingInProgress(userId, true));
    let response = await apiMethod(userId);
    // if (response.resultCode === 0) {
        dispatch(callbackAC(userId))
    // }
    dispatch(actions.setFollowingInProgress(userId, false));
        
}

export const unFollowUser = (userId: number) => (dispatch: Dispatch<ActionsTypes>) => {
    return  _toggleFollowUnfollow(dispatch, userId, usersAPI.unfollowUserWithAPI, actions.unFollow)
}
export const followUser = (userId: number) => (dispatch: Dispatch<ActionsTypes>) => {
    return _toggleFollowUnfollow(dispatch, userId, usersAPI.followUserWithAPI, actions.follow)
}



export default usersReducer;












export type InitialStateType = typeof initialState;
export type User = {
    name: string | null,
    id: number,
    uniqueUrlName: null | string,
    photos: {
        large: null | string,
        small: null | string,
    },
    status: null | string,
    followed: boolean
}
