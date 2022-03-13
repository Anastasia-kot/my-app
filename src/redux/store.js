import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";



let store = {
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {
        console.log('im re renderer');
    },


    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: '15' },
                { id: 2, message: 'How are you?', likeCounter: '23' },
                { id: 3, message: 'It kamasutra', likeCounter: '11' },
                { id: 4, message: 'Yo', likeCounter: '12' }
            ],
            newPostText: '',
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimich' },
                { id: 2, name: 'Sasha' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Viktor' },
                { id: 5, name: 'Valera' },
            ],
            messages: [
                { id: 1, message: 'Hi', isMine: true },
                { id: 2, message: 'How are you', isMine: true },
                { id: 3, message: 'Yo', isMine: false },
                { id: 4, message: 'Yo', isMine: false },
                { id: 4, message: 'How are you', isMine: false },

            ],
            newMessageText: '',

        }
    },
    getState() {
        return this._state;
    },


    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    },


}

window.store = store;





export default store;

