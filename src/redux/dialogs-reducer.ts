import { InferActionsTypes } from './redux-store';
 

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
        case 'ADD_MESSAGE':
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
    
        case 'UPDATE_NEW_MESSAGE_TEXT':
            return {
                ...state,
                newMessageText: action.text
            };
        
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addMessageActionCreator: ()  => ({ type: 'ADD_MESSAGE' } as const),
    updateNewMessageTextActionCreator: (text: string) => ({ type: 'UPDATE_NEW_MESSAGE_TEXT', text } as const),
}


export default dialogsReducer;