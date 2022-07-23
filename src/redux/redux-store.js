import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk    from 'redux-thunk';
import dialogsReducer from "./dialogs-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import authReducer from "./auth-reducer.ts";
import usersReducer from "./users-reducer.ts";




let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authReducer: authReducer,

})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
// export let store = createStore(reducers, applyMiddleware(thunk)); 

window.store = store;