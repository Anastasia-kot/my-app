import  { actions,  PhotosType, PostType, UserInfoType, 
    getUserData, updateProfilePhoto, getStatus, updateStatus } from "./profile-reducer";
import { profileAPI } from './../API/api';
import { AxiosResponseHeaders } from "axios";

jest.mock('./../API/api')
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>

enum ResponseStatusEnum {
    success = 200,
    error = 400,
}
  
const response = {
    data: {
        status: 'dfsfd' as string | null,
        data: {
            photos: {} as PhotosType
        }
    } as any,
    // status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,

    status: ResponseStatusEnum.success as ResponseStatusEnum,
}
const getStatusResponse = {
    data:  
        'dfsfd' as string | null,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,
    status: ResponseStatusEnum.success as ResponseStatusEnum,
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
    profileAPIMock.getUserDataWithAPI.mockReturnValue(Promise.resolve(response))

    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUser(response.data));  
 
})

test('update Profile Photo thunk success', async () => {
    const thunk = updateProfilePhoto('1');
    profileAPIMock.updateProfilePhotoWithAPI.mockReturnValue(Promise.resolve(response))
   
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setPhoto(response.data.data.photos));

})


test('get Status thunk success', async () => {
    const thunk = getStatus(0);
    //@ts-ignore
    profileAPIMock.getStatusWithAPI.mockReturnValue(Promise.resolve(getStatusResponse))

    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus(getStatusResponse.data ));
})


test('update Status thunk success', async () => {
    const thunk = updateStatus('new_status');
    profileAPIMock.updateStatusWithAPI.mockReturnValue(Promise.resolve(response))
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus( 'new_status' ));
})