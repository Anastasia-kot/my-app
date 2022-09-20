import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
// @ts-ignore
import dialogsReducer from "./dialogs-reducer.ts";
// @ts-ignore
import profileReducer from "./profile-reducer.ts";
// @ts-ignore
import authReducer from "./auth-reducer.ts";
// @ts-ignore
import usersReducer from "./users-reducer.ts";
// @ts-ignore
import chatReducer from "./chat-reducer.ts";




let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    chatPage: chatReducer,
})

export type RootState = ReturnType<typeof RootReducer>

export type InferActionsTypes<T extends {[key: string]:(...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(RootReducer, compose(
    applyMiddleware(thunk)
));
 
// window.store = store;