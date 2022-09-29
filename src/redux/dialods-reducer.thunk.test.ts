import dialogsReducer, { actions, DialogType, InitialStateType, MessageType,   } from "./dialogs - reducer";

import { dialogsAPI } from '../API/api';
import { AxiosResponseHeaders } from "axios";
import { startDialog } from "./dialogs-reducer";

jest.mock('./../API/api')
const dialogsAPIMock = dialogsAPI as jest.Mocked<typeof dialogsAPI>


  
const response = {
//     // fieldsErrors: [] as Array<any>,
//     // messages: [] as Array<any>,
//     // resultCode: ResultCodeEnum.success,
    data: {
        
    } as any,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,
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
 