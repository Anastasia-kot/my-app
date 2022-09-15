import { dialogsAPI } from '../API/api.ts';
import { InferActionsTypes } from './redux-store';
 

type InitialStateType = typeof initialState;

let initialState = {
    dialogs: [] as Array<Dialog>,
    messages: [
        { id: 1, message: 'Hi', isMine: true },
        { id: 2, message: 'How are you', isMine: true },
        { id: 3, message: 'Yo', isMine: false },
        { id: 4, message: 'Yo', isMine: false },
        { id: 5, message: 'How are you', isMine: false },

    ],
    newMessageText: '' as string,

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
        case 'SET_DIALOGS':
            return {
                ...state,
                dialogs: action.dialogs
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
    setDialogs: (dialogs: Array<Dialog>) => ({ type: 'SET_DIALOGS', dialogs } as const),
    addMessageActionCreator: ()  => ({ type: 'ADD_MESSAGE' } as const),
    updateNewMessageTextActionCreator: (text: string) => ({ type: 'UPDATE_NEW_MESSAGE_TEXT', text } as const),
}





export const getDialogs = () => async (dispatch) => {
    try {
        const dialogs = await dialogsAPI.getDialogsWithAPI()
        dispatch(actions.setDialogs(dialogs))
    } catch (err) {
        console.error('please try later')
    }
}


export default dialogsReducer;





type Dialog = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string    //ISO DATE
    lastUserActivityDate: string    //ISO DATE
    newMessagesCount: number
    photos: { 
        small: null | string,    // URL string
        large: null | string     // URL string
    }
    userName: string
}