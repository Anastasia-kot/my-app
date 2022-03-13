const ADD_POST = 'ADD_POST';
const UPDATE_NEW_TEXT = 'UPDATE_NEW_TEXT';

export let addPostActionCreator = () => ({ type: ADD_POST, });
export let updateNewTextActionCreator = (text) => ({ type: UPDATE_NEW_TEXT, newText: text });


let initialState =  {
    posts: [
        { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: '15' },
        { id: 2, message: 'How are you?', likeCounter: '23' },
        { id: 3, message: 'It kamasutra', likeCounter: '11' },
        { id: 4, message: 'Yo', likeCounter: '12' }
    ],
        newPostText: '',
};


const profileReducer = (state = initialState, action) => {
     switch (action.type) {

        case  ADD_POST:  
            let postMessage = state.newPostText;
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: postMessage, likeCounter: 0} ],
                newPostText:''
            };

        case UPDATE_NEW_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

        default: 
            return state;
    }
}



export default profileReducer;