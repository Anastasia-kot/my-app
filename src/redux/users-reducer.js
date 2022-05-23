const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING_STATUS = 'SET_IS_FETCHING_STATUS';




let initialState =  {
    users: [],
    totalCount: 0,
    count: 5,
    currentPage: 1,
    isFetching: false,
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

        default: 
            return state;
    }
};

export let followUser = (userId) => ({ type: FOLLOW, userId });
export let unFollowUser = (userId) => ({ type: UNFOLLOW, userId });
export let setUsers = (users) => ({ type: SET_USERS, users});
export let setCurrentPage = (newCurrentPage) => ({ type: SET_CURRENT_PAGE, newCurrentPage});
export let setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
export let setIsFetchingStatus = (isFetchingStatus) => ({ type: SET_IS_FETCHING_STATUS, isFetchingStatus});



export default usersReducer;