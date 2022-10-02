import { actions, followUser, getUsersTC, setNewCurrentPage, unFollowUser, User } from './users-reducer';
import { usersAPI } from './../API/api';
import { AxiosResponseHeaders } from 'axios';
jest.mock('./../API/api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

enum ResultCodeEnum {
    success = 0,
    error = 1,
}
const responseGetUsers= {
    // fieldsErrors: [] as Array<any>,
    // messages: [] as Array<any>,
    // resultCode: ResultCodeEnum.success as ResultCodeEnum,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,
    data: {
        items: [
            {
            name: '11',
            id: 0,
            uniqueUrlName: null,
            photos: {
                large: null,
                small: null,
            },
            status: 'asfsdfds',
            followed: false
        },
            {
                name: '22 22',
                id: 1,
                uniqueUrlName: null,
                photos: {
                    large: null,
                    small: null,
                },
                status: 'eqwweqweqweq',
                followed: true
            },
            {
                name: '33 333',
                id: 2,
                uniqueUrlName: null,
                photos: {
                    large: null,
                    small: null,
                },
                status: 'fsf',
                followed: false
            },
] as Array<User>,
        totalCount: 0 as number
    },
   
}
const responseToggleFollowUnfollow = {
    // fieldsErrors: [] as Array<any>,
    // messages: [] as Array<any>,
    // resultCode: ResultCodeEnum.success,
    data: {} as any,
    status: 200 as number,
    statusText: 'OK' as string,
    headers: {} as AxiosResponseHeaders,
    config: {} as object,
    request: {} as object,
}

usersAPIMock.followUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow)) //как у Димыча
usersAPIMock.unfollowUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow))//как у Димыча
usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(responseGetUsers.data))//как у Димыча

// usersAPIMock.followUserWithAPI.mockImplementation(() => Promise.resolve(responseToggleFollowUnfollow))    //версия из интернета
// usersAPIMock.unfollowUserWithAPI.mockImplementation(() => Promise.resolve(responseToggleFollowUnfollow))   //версия из интернета
// usersAPIMock.getUsersWithAPI.mockImplementation(() => Promise.resolve(responseGetUsers))   //версия из интернета

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(
    () => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        usersAPIMock.followUserWithAPI.mockClear();
        usersAPIMock.unfollowUserWithAPI.mockClear();
        usersAPIMock.getUsersWithAPI.mockClear();
    }
)

test('follow thunk success', async () => {
    const thunk = followUser(0);   //id=0
    usersAPIMock.followUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow.data)) //как у Димыча

    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(0, true)); //id=0
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(0)); //id=0
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(0, false)); //id=0
})

test('unfollow thunk success', async () => {
    const thunk = unFollowUser(1);   //id=1
    usersAPIMock.unfollowUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow))//как у Димыча

    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(1, true )); //id=1
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(1)); //id=1
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(1, false)); //id=1 
})

test('get UsersTC thunk success', async () => {
    const thunk = getUsersTC(10, 1);   // count, currentPage
    usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(responseGetUsers.data))//как у Димыча

    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(4);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetchingStatus(true));
    // expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUsers(responseGetUsers.data.items  ));  //  responseGetUsers = undefined
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setTotalUsersCount(responseGetUsers.data.totalCount));  //  responseGetUsers = undefined
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetchingStatus(false));
  
})

test('set New Current Page  thunk success', async () => {
    const thunk = setNewCurrentPage(2, 10);   // newCurrentPage: number, count: number
    usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(responseGetUsers.data))//как у Димыча

    await thunk(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(4);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCurrentPage(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setIsFetchingStatus(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setUsers(responseGetUsers.data.items )); //responseGetUsers = undefined
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetchingStatus(false));
  
})

 
 
 








