import dialogsReducer, { actions, DialogType, InitialStateType, MessageType,   } from "./dialogs-reducer";
 

let state: InitialStateType;
beforeEach(
    () => {
        state = {
            dialogs: [] as Array<DialogType>,
            messages: [] as Array<MessageType>,
            newMessageText: '' as string,
        }
    }
)


it('new message text field should be cleared', ()=>{
    let action = actions.addMessage();
    state.newMessageText ='hfdshjsd'
    let newState = dialogsReducer(state, action);
    expect(newState.newMessageText.length).toBe(0);
    expect(newState.newMessageText).toBe('');
    }
);

it('new message text field should be updated', () => {
    let action = actions.updateMessageText('hfdshjsd');
    let newState = dialogsReducer(state, action);
    expect(newState.newMessageText).toBe('hfdshjsd');
    }
);


it('set Dialogs success', ()=>{
    const action_dialogs = [
        {            id: 1},
        {            id: 2}, 
        {            id: 3}
    ]
    let action = actions.setDialogs(action_dialogs as Array<DialogType>);
    let newState = dialogsReducer(state, action);
    expect(newState.dialogs.length).toBe(3);
    }
);
 

it('set messages success', ()=>{
    const action_messages = [
        {           id: '1'        }, 
        {           id: '2'        },
        {           id: '3'        }
    ]
    let action = actions.setMessages(action_messages as Array<MessageType>);
    let newState = dialogsReducer(state, action);
    expect(newState.messages.length).toBe(3);
    }
);
 
