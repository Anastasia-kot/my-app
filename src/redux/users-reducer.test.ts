import usersReducer, { actions, InitialStateType, User } from './users-reducer';

let state: InitialStateType;
beforeEach(
    () => {
        state = {
            users: [
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
            totalCount: 0 as number,
            count: 10 as number,
            currentPage: 1 as number,
            isFetching: false as boolean,
            followingInProgress: [] as Array<number>,
        }
    }
)

test('follow success', () => {
    const newState = usersReducer(state, actions.follow(0));
    expect(newState.users[0].followed).toBeTruthy();
    expect(newState.users[1].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
})
test('unfollow success', () => {
    const newState = usersReducer(state, actions.unFollow(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
})
 
test('set Current Page success', () => {
    const newState = usersReducer(state, actions.setCurrentPage(10));
    expect(newState.currentPage).toBe(10);
})
 
test('set is Fetching success', () => {
    const newState = usersReducer(state, actions.setFollowingInProgress(1, true));
    expect(newState.followingInProgress.length).toBe(1);
})
 
test('set is Fetching true  success', () => {
    const newState = usersReducer(state, actions.setIsFetchingStatus(true));
    expect(newState.isFetching).toBeTruthy();
})
 
test('set is Fetching  false success', () => {
    const newState = usersReducer(state, actions.setIsFetchingStatus(false));
    expect(newState.isFetching).toBeFalsy();
})
 
test('set Total Users Count success', () => {
    const newState = usersReducer(state, actions.setTotalUsersCount(500));
    expect(newState.totalCount).toBe(500);
})
 
test('set  Users success', () => {
    const newState = usersReducer(state, actions.setUsers([{
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
        }]));
    expect(newState.users.length).toBe(2);
})
 
test('set Users On Page Count Count success', () => {
    const newState = usersReducer(state, actions.setUsersOnPageCount(20));
    expect(newState.count).toBe(20);
})
 