import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {todoReduser} from "./todoReduser";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    todo: todoReduser,
    form: formReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));