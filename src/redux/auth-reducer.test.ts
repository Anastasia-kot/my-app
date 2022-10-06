import authReducer, { actions, AuthUserDataType, InitialStateType } from "./auth-reducer";


let state: InitialStateType;
beforeEach(
    () => {
        state = {
            data: {
                email: null as string | null,
                id: null as number | null,
                login: null as string | null,
            },
            isAuth: false as boolean,
            initialized: false as boolean
        };
    })


test('set Initialized true (success)', () => {
    const newState = authReducer(state, actions.setInitialized(true));
    expect(newState.initialized).toBeTruthy();
})

test('Toggle Login false to true', () => {
    state.isAuth = false
    const newState = authReducer(state, actions.setToggleLogIn(true));
    expect(newState.isAuth).toBeTruthy();
})
test('Toggle Login false to false', () => {
    state.isAuth = false
    const newState = authReducer(state, actions.setToggleLogIn(false));
    expect(newState.isAuth).toBeFalsy();
})

test('Toggle Login true to false', () => {
    state.isAuth = true
    const newState = authReducer(state, actions.setToggleLogIn(false));
    expect(newState.isAuth).toBeFalsy();
})

test('Toggle Login true to true', () => {
    state.isAuth = true
    const newState = authReducer(state, actions.setToggleLogIn(true));
    expect(newState.isAuth).toBeTruthy();
})
 
test('set Auth User Data', () => {
    const data = {
        id: 0,
        login: '1',
        email: '2',
    } as AuthUserDataType
    const newState = authReducer(state, actions.setAuthUserData(data));
    expect(newState.data.id).toBe(0);
    expect(newState.data.login).toBe('1');
    expect(newState.data.email).toBe('2');
})
 

       

 
