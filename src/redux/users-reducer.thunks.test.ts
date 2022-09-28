import { actions, followUser, getUsersTC, setNewCurrentPage, unFollowUser, User } from './users-reducer';
import { usersAPI } from './../API/api';
jest.mock('./../API/api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

enum ResultCodeEnum {
    success = 0,
    error = 1,
}
const responseGetUsers= {
    fieldsErrors: [] as Array<any>,
    messages: [] as Array<any>,
    resultCode: ResultCodeEnum.success as ResultCodeEnum,
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
    } 
}
const responseToggleFollowUnfollow = {
    fieldsErrors: [] as Array<any>,
    messages: [] as Array<any>,
    resultCode: ResultCodeEnum.success,
    data: {} as any,
}

usersAPIMock.followUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow))
usersAPIMock.unfollowUserWithAPI.mockReturnValue(Promise.resolve(responseToggleFollowUnfollow))
usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(responseGetUsers))

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
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(0, true)); //id=0
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(0)); //id=0
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(0, false)); //id=0
})

test('unfollow thunk success', async () => {
    const thunk = unFollowUser(1);   //id=1
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(1, true )); //id=1
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(1)); //id=1
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(1, false)); //id=1 
})

test('get UsersTC thunk success', async () => {
    const thunk = getUsersTC(10, 1);   // count, currentPage
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(4);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetchingStatus(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUsers(  ));  //  responseGetUsers.items= undefined
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setTotalUsersCount(  ));  
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetchingStatus(false));
  
})

test('set New Current Page  thunk success', async () => {
    const thunk = setNewCurrentPage(2, 10);   // newCurrentPage: number, count: number
    await thunk(dispatchMock);
    usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(responseGetUsers))

    expect(dispatchMock).toBeCalledTimes(4);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCurrentPage(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setIsFetchingStatus(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setUsers( )); //responseGetUsers.data.items= undefined
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetchingStatus(false));
  
})

 
 
 








