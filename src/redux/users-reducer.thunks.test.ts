import { actions, followUser, getUsersTC, setNewCurrentPage, unFollowUser, User } from './users-reducer';

import { ResultCodeEnum, usersAPI } from './../API/api';

jest.mock('./../API/api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const response = {
    fieldsErrors: [] as Array<any>,
    messages: [] as Array<any>,
    resultCode: ResultCodeEnum,
    items: [] as Array<User>,
    data: {} as any,
    totalCount: 112
}

usersAPIMock.followUserWithAPI.mockReturnValue(Promise.resolve(response))
usersAPIMock.unfollowUserWithAPI.mockReturnValue(Promise.resolve(response))
usersAPIMock.getUsersWithAPI.mockReturnValue(Promise.resolve(response))

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
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetchingStatus(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUsers([] as Array<User>));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setTotalUsersCount(112));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetchingStatus(false));
    expect(dispatchMock).toBeCalledTimes(4);
  
})

test('set New Current Page  thunk success', async () => {
    const thunk = setNewCurrentPage(2, 10);   // newCurrentPage: number, count: number
    await thunk(dispatchMock);
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.setCurrentPage(2));
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.setIsFetchingStatus(true));
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.setUsers([] as Array<User>));
    expect(dispatchMock).toHaveBeenCalledWith(4, actions.setIsFetchingStatus(false));
    expect(dispatchMock).toBeCalledTimes(4);
  
})

 
 
 