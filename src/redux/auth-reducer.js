import { getAuthUserDataWithAPI } from "../API/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
//const UNLOGIN = 'UNLOGIN';


let initialState =  {
    data: {
        email: null, 
        id: null,
        login: null
    },
    isAuth: false
};


const authReducer = (state = initialState, action) => {
     switch (action.type) {
      
        case SET_AUTH_USER_DATA: {
            let newState = {...state};
            newState.isAuth = true;
            newState.data = action.userData;

            return newState;
            // return { ...state, data: action.userData, isAuth: true}
        }

        // case UNLOGIN:
        //      return { ...state, isAuth: false, 
        //                 ...state.data, id: null, email: null, login:null }

        default: 
            return state;
    }
}


export let setAuthUserData = (userData) => ({ type: SET_AUTH_USER_DATA, userData });
 
export const getAuthUserData = () => (dispatch) => {

    getAuthUserDataWithAPI()
        .then(response => {
            if (response.resultCode === 0) { 
                dispatch(setAuthUserData(response.data)) }
        });

}

export default authReducer;