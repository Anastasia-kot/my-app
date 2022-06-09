import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk    from 'redux-thunk';
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";




let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authReducer: authReducer, 

})

export let store = createStore(reducers, applyMiddleware(thunk)); 

window.store = store;