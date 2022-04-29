const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState =  {
    users: [
        { name: 'Mike', age: '30', address: {country:'Russia', city: 'Krasnodar'}, userId: 1, isFollowed: true },
        { name: 'Sasha', age: '35', address: { country: 'Ukraine', city: 'Kiev' }, userId: 2, isFollowed: true },
        { name: 'Alex', age: '25', address: { country: 'Belarus', city: 'Minsk' }, userId: 3, isFollowed: false },
    ],
    usersCount: 0,
   
};


const usersReducer = (state = initialState, action) => {
     switch (action.type) {

        case FOLLOW:  
            let postMessage = state.newPostText;
            return {
                ...state,
                users: [...state.users, { id: 5, message: postMessage, likeCounter: 0} ],
            };

         case UNFOLLOW:
            return {
                ...state,
                newPostText: action.newText
            };
        
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };

        default: 
            return state;
    }
};

export let followAC = (userID) => ({ type: FOLLOW, userID: userID });
export let unfollowAC = (userID) => ({ type: UNFOLLOW, userID: userID });
export let setUsersAC = (users) => ({ type: SET_USERS, users});












export default usersReducer;