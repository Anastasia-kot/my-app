import { AxiosResponseHeaders } from "axios";
import { Dispatch } from "react";
import { authAPI } from "../API/api";
import { actions, getInitialized, getLogined, getUnLogined } from "./auth-reducer";
 
jest.mock('./../API/api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
 
enum ResultCodeEnum {
    success = 0,
    error = 1,
}
const response = {
    data: {
       
    } as any,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,

    resultCode: ResultCodeEnum.success as ResultCodeEnum,
    fieldsErrors: [] as any,
    messages: [] as any,  
}

authAPIMock.getAuthUserDataWithAPI.mockReturnValue(Promise.resolve(response))
authAPIMock.logOutWithAPI.mockReturnValue(Promise.resolve(response))
// authAPIMock.loginWithAPI.mockReturnValue(Promise.resolve(response))
 



const dispatchMock = jest.fn()
const getStateMock = jest.fn()



beforeEach(
    () => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        authAPIMock.getAuthUserDataWithAPI.mockClear();
        authAPIMock.logOutWithAPI.mockClear();
        authAPIMock.loginWithAPI.mockClear();          
    }
)


test('Initialized success', async () => {
    const thunk = getInitialized();   
    authAPIMock.getAuthUserDataWithAPI.mockReturnValue(Promise.resolve(response))
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAuthUserData(response.data));   
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setToggleLogIn(true));   
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setInitialized(true));   

})


test('Logined success', async () => {
    const thunk = getLogined('1', '2', false);   //(email:string, password:string, rememberMe: boolean)
    authAPIMock.loginWithAPI.mockReturnValue(Promise.resolve(response))
    authAPIMock.getAuthUserDataWithAPI.mockReturnValue(Promise.resolve(response))
    // @ts-ignore
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAuthUserData(response.data));   
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setToggleLogIn(true));   
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setInitialized(true));   
})
 
test('Log out', async () => {
    const thunk = getUnLogined();   
    authAPIMock.logOutWithAPI.mockReturnValue(Promise.resolve(response))
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setToggleLogIn(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAuthUserData(
        {
            email: null,
            id: null,
            login: null
        }
    ));   
})
 
 