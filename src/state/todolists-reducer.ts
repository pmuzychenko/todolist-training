import {TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-NAME':
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case  'CHANGE-TODOLIST-FILTER':
            let filteredTodolist = state.find(tl => tl.id === action.id)
            if (filteredTodolist) {
                filteredTodolist.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't get this action type")
    }
}