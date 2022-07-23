const ADD_MESSAGE = 'DIALOGS-REDUCER/ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'DIALOGS-REDUCER/UPDATE_NEW_MESSAGE_TEXT';

type InitialStateType = typeof initialState;

let initialState = {
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


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessageText = state.newMessageText;
            return {
                ...state,
                messages: [...state.messages, {
                    id: 5,
                    message: newMessageText,
                    isMine: true }
                ],
                newMessageText: ''
            };
    
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.text
            };
        
        default:
            return state;
    }
}

type ActionsTypes = AddMessageActionCreatorAT | UpdateNewMessageTextActionCreatorAT;
type AddMessageActionCreatorAT = {
    type: typeof ADD_MESSAGE
}
export let addMessageActionCreator = (): AddMessageActionCreatorAT => ({ type: ADD_MESSAGE });

type UpdateNewMessageTextActionCreatorAT = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    text: string
}
export let updateNewMessageTextActionCreator = (text: string): UpdateNewMessageTextActionCreatorAT => ({ type: UPDATE_NEW_MESSAGE_TEXT, text });



export default dialogsReducer;