const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';




let initialState =  {
    users: [],
    totalCount: 0,
    count: 5,
    currentPage: 1
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

        default: 
            return state;
    }
};

export let followAC = (userId) => ({ type: FOLLOW, userId });
export let unFollowAC = (userId) => ({ type: UNFOLLOW, userId });
export let setUsersAC = (users) => ({ type: SET_USERS, users});
export let setCurrentPageAC = (newCurrentPage) => ({ type: SET_CURRENT_PAGE, newCurrentPage});
export let setTotalUsersCountAC = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });



export default usersReducer;