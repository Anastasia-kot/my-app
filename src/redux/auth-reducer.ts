import { Dispatch } from "react";
import { getAuthUserDataWithAPI, loginWithAPI, logOutWithAPI } from "../API/api";

const SET_AUTH_USER_DATA = 'AUTH-REDUCER/SET_AUTH_USER_DATA';
const TOGGLE_LOG_IN = 'AUTH-REDUCER/TOGGLE_LOG_IN';
const SET_INITIALIZED = 'AUTH-REDUCER/SET_INITIALIZED';



export type InitialStateType = typeof initialState;
type UserData = typeof initialState.data;

let initialState =  {
    data: {
        email: null as string | null , 
        id: null as number | null,
        login: null as string | null, 
    },
    isAuth: false as boolean,
    initialized: false as boolean

};


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
     switch (action.type) {
      
        case SET_AUTH_USER_DATA: {
            return { 
                ...state, 
                data: {...action.userData} 
                }
        }

        case TOGGLE_LOG_IN:
            return {
                 ...state, 
                 isAuth: action.isAuth, 
            }
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: action.initialized
            }
         }

        default: 
            return state;
    }
}

type ActionsTypes = SetAuthUserDataAT | SetToggleLogInAT | SetInitializedAT;
type SetAuthUserDataAT = {
    type: typeof SET_AUTH_USER_DATA, 
    userData: UserData
}
export let setAuthUserData = (userData: UserData): SetAuthUserDataAT => ({ type: SET_AUTH_USER_DATA, userData });

type SetToggleLogInAT = {
    type: typeof TOGGLE_LOG_IN,
    isAuth: boolean
}
export let setToggleLogIn = (isAuth: boolean): SetToggleLogInAT => ({ type: TOGGLE_LOG_IN, isAuth });

type SetInitializedAT = {
    type: typeof SET_INITIALIZED,
    initialized: boolean
}
export let setInitialized = (initialized: boolean): SetInitializedAT => ({ type: SET_INITIALIZED, initialized });


export const getInitialized = () => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await  getAuthUserDataWithAPI()
        dispatch(setAuthUserData(response.data))
        dispatch(setInitialized(true))
    }
}

export const getAuthUserData = () => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        let response = await getAuthUserDataWithAPI()
        dispatch(setAuthUserData(response.data))  
    }
}

export const getLogined = (email:string, password:string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await loginWithAPI(email, password, rememberMe)
        getAuthUserData()
        dispatch(setToggleLogIn(true))        
    }
}


export const getUnLogined = () => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        let response = await logOutWithAPI()
        dispatch(setToggleLogIn(false))
        dispatch(setAuthUserData({
            email: null,
            id: null,
            login: null
        }))
    };
}


export default authReducer;