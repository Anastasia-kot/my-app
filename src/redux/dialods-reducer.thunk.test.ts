import { actions, getDialogs, startDialog, getMessages, DialogType, MessageType, sendMessage } from "./dialogs-reducer";
import { dialogsAPI } from '../API/api';
import { AxiosResponseHeaders } from "axios";

jest.mock('./../API/api')
const dialogsAPIMock = dialogsAPI as jest.Mocked<typeof dialogsAPI>


enum ResultCodeEnum {
    success = 0,
    error = 1,
}

const response = {
    data: {
        dialogs: [] as Array<DialogType>,
        items: [] as Array<MessageType>,
    } as any,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,

    resultCode: ResultCodeEnum.success as ResultCodeEnum,
}

dialogsAPIMock.getDialogsWithAPI.mockReturnValue(Promise.resolve(response))
dialogsAPIMock.getMessagesListWithAPI.mockReturnValue(Promise.resolve(response))
dialogsAPIMock.sendMessageWithAPI.mockReturnValue(Promise.resolve(response))
dialogsAPIMock.startDialogWithAPI.mockReturnValue(Promise.resolve(response))
 


const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(
    () => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        dialogsAPIMock.getDialogsWithAPI.mockClear();
        dialogsAPIMock.getMessagesListWithAPI.mockClear();
        dialogsAPIMock.sendMessageWithAPI.mockClear();
        dialogsAPIMock.startDialogWithAPI.mockClear();
    }
)

test('start Dialog thunk success', async () => {
        const thunk = startDialog(0);   //id=0
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(0);
 // так как вызывает другую санку
 
})
 

test('get Dialogs thunk success', async () => {
        const thunk = getDialogs();
        dialogsAPIMock.getDialogsWithAPI.mockReturnValue(Promise.resolve(response.data.dialogs))
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setDialogs(response.data.dialogs));  //id=0
})
 

test('get messages thunk success', async () => {
    const thunk = getMessages(0); // getMessages(id: number, page: number = 1, count: number = 10)
    dialogsAPIMock.getMessagesListWithAPI.mockReturnValue(Promise.resolve(response.data))
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1); 
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setMessages(response.data.items));  //  dispatch(actions.setMessages(messages.items))
 
})


test('send messages thunk success', async () => {
    const thunk = sendMessage(0, 'sdsdsd'); //  id: number, message: string
    dialogsAPIMock.sendMessageWithAPI.mockReturnValue(Promise.resolve(response))
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1); 
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.addMessage());   
        // getMessages(id) - вызывает другую санку

})
 
 
 