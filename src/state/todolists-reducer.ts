import {FilterTaskValues, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    filter: FilterTaskValues
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-NAME'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterTaskValues
    id: string
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType  => ({type:'REMOVE-TODOLIST', id: todolistId })
export const AddTodolistAC = (title: string, filter: FilterTaskValues):AddTodolistActionType  => ({type:'ADD-TODOLIST', title, filter})
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({type:'CHANGE-TODOLIST-NAME', id: todolistId, title })
export const ChangeTodolistFilterAC = (filter: FilterTaskValues, todolistId: string) : ChangeTodolistFilterActionType => ({type:'CHANGE-TODOLIST-FILTER', filter: filter,id: todolistId })


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: action.filter}]
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