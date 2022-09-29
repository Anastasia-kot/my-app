import profileReducer, { actions, InitialStateType, PhotosType, PostType, UserInfoType, 
    getUserData, updateProfilePhoto, getStatus, updateStatus } from "./profile-reducer";
import { profileAPI } from './../API/api';
import { AxiosResponseHeaders } from "axios";

jest.mock('./../API/api')
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>


  
const response = {
    // fieldsErrors: [] as Array<any>,
    // messages: [] as Array<any>,
    // resultCode: ResultCodeEnum.success,
    data: {
        status: 'dfsfd' as string | null
    } as any,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,
}

profileAPIMock.getStatusWithAPI.mockReturnValue(Promise.resolve(response))
profileAPIMock.getUserDataWithAPI.mockReturnValue(Promise.resolve(response))
profileAPIMock.updateProfilePhotoWithAPI.mockReturnValue(Promise.resolve(response))
profileAPIMock.updateStatusWithAPI.mockReturnValue(Promise.resolve(response))


const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(
    () => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        profileAPIMock.getStatusWithAPI.mockClear();
        profileAPIMock.getUserDataWithAPI.mockClear();
        profileAPIMock.updateProfilePhotoWithAPI.mockClear();
        profileAPIMock.updateStatusWithAPI.mockClear();
    }
)

test('get User Data thunk success', async () => {
    const thunk = getUserData(0);   //id=0
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUser( ));  
 
})

test('update Profile Photo thunk success', async () => {
    const thunk = updateProfilePhoto( );   
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setPhoto());

})


test('get Status thunk success', async () => {
    const thunk = getStatus(0);
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus( ));
})

test('update Status thunk success', async () => {
    const thunk = updateStatus('new_status');
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus( 'new_status' ));
})