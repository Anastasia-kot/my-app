import { Dispatch } from "react";
import { getAuthUserDataWithAPI, loginWithAPI, logOutWithAPI } from "../API/api";
import { InferActionsTypes } from "./redux-store";

 
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
      
        case 'SET_AUTH_USER_DATA': {
            return { 
                ...state, 
                data: {...action.userData} 
                }
        }

        case 'TOGGLE_LOG_IN':
            return {
                 ...state, 
                 isAuth: action.isAuth, 
            }
        case 'SET_INITIALIZED': {
            return {
                ...state,
                initialized: action.initialized
            }
         }

        default: 
            return state;
    }
}
type ActionsTypes = InferActionsTypes<typeof actions> 


export const actions = {

    setAuthUserData : (userData: UserData) => ({ type: 'SET_AUTH_USER_DATA', userData } as const),
    setToggleLogIn: (isAuth: boolean) => ({ type: 'TOGGLE_LOG_IN', isAuth } as const),
    setInitialized: (initialized: boolean) => ({ type: 'SET_INITIALIZED', initialized } as const),
}


export const getInitialized = () => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await  getAuthUserDataWithAPI()
        dispatch(actions.setAuthUserData(response.data))
        dispatch(actions.setInitialized(true))
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
        dispatch(actions.setToggleLogIn(true))        
    }
}


export const getUnLogined = () => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        let response = await logOutWithAPI()
        dispatch(actions.setToggleLogIn(false))
        dispatch(actions.setAuthUserData({
            email: null,
            id: null,
            login: null
        }))
    };
}


export default authReducer;