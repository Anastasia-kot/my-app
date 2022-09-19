import { Dispatch } from "react";
// @ts-ignore
import { authAPI } from "../API/api.ts";
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

    setAuthUserData: (userData: UserData) => ({ type: 'SET_AUTH_USER_DATA', userData } as const),
    setToggleLogIn: (isAuth: boolean) => ({ type: 'TOGGLE_LOG_IN', isAuth } as const),
    setInitialized: (initialized: boolean) => ({ type: 'SET_INITIALIZED', initialized } as const),
}


export const getInitialized = () => { //перезагрузка страницы
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await authAPI.getAuthUserDataWithAPI()
        dispatch(actions.setAuthUserData(response.data))
         if (response.resultCode === 0) {
            dispatch(actions.setToggleLogIn(true)) // уточнить эту строку  
        }
        dispatch(actions.setInitialized(true))
    }
}



export const getLogined = (email:string, password:string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await authAPI.loginWithAPI(email, password, rememberMe)
         
        if (response) {

             
            let response1 = await authAPI.getAuthUserDataWithAPI()
            dispatch(actions.setAuthUserData(response1.data))
                 
            dispatch(actions.setToggleLogIn(true))
            dispatch(actions.setInitialized(true))
        }
    }
}


export const getUnLogined = () => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        let response = await authAPI.logOutWithAPI()
        
        if (response.resultCode ===0) {
        dispatch(actions.setToggleLogIn(false))
         
        dispatch(actions.setAuthUserData({
            email: null,
            id: null,
            login: null
        }))
        }
    };
}


export default authReducer;