import {FilterTaskValues, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
    filter: FilterTaskValues
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-NAME'
    todolistId: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterTaskValues
    todolistId: string
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType  => ({type:'REMOVE-TODOLIST', todolistId })
export const AddTodolistAC = (title: string, filter: FilterTaskValues):AddTodolistActionType  =>
    ({type:'ADD-TODOLIST', title, todolistId: v1(), filter})

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({type:'CHANGE-TODOLIST-NAME', todolistId, title })
export const ChangeTodolistFilterAC = (filter: FilterTaskValues, todolistId: string) : ChangeTodolistFilterActionType => ({type:'CHANGE-TODOLIST-FILTER', filter,todolistId })


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: action.filter}]
        case 'CHANGE-TODOLIST-NAME':
            let todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case  'CHANGE-TODOLIST-FILTER':
            let filteredTodolist = state.find(tl => tl.id === action.todolistId)
            if (filteredTodolist) {
                filteredTodolist.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't get this action type")
    }
}