const ADD_POST = 'ADD_POST';
const UPDATE_NEW_TEXT = 'UPDATE_NEW_TEXT';
const SET_USER = 'SET_USER';



let initialState =  {
    posts: [
        { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: '15' },
        { id: 2, message: 'How are you?', likeCounter: '23' },
        { id: 3, message: 'It kamasutra', likeCounter: '11' },
        { id: 4, message: 'Yo', likeCounter: '12' }
    ],
        newPostText: '',
        userInfo: null,
};


const profileReducer = (state = initialState, action) => {
     switch (action.type) {

        case  ADD_POST:  
            let postMessage = state.newPostText;
            return {
                ...state,
                posts: [...state.posts, { id: (state.posts.length + 1), message: postMessage, likeCounter: 0} ],
                newPostText:''
            };

        case UPDATE_NEW_TEXT:
            return { ...state, newPostText: action.newText}

        case SET_USER:
            return { ...state, userInfo: action.userData}

        default: 
            return state;
    }
}


export let addPost= () => ({ type: ADD_POST, });
export let updateNewText = (text) => ({ type: UPDATE_NEW_TEXT, newText: text });
export let setUser = (userData) => ({ type: SET_USER, userData });
 

export default profileReducer;