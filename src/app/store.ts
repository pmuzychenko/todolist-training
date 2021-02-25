import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appStatus: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;