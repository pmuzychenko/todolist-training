import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
    filter: FilterValuesType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-NAME'
    todolistId: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistId: string
}

export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | GetTodolistsActionType


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    todolistId
})

export const addTodolistAC = (title: string): AddTodolistActionType =>
    ({type: 'ADD-TODOLIST', title, todolistId: v1(), filter: 'all'})

export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-NAME',
    title,
    todolistId
})

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todolistId
})

export const getTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'GET-TODOLISTS',
    todolists
} as const)


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    debugger
    switch (action.type) {
        case "GET-TODOLISTS":{
            return action.todolists.map( tl => {
                return {...tl, filter: 'all'}
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }

        case 'CHANGE-TODOLIST-NAME': {
            let copyState = [...state]
            let todolist = copyState.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return copyState
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let filteredTodolist = state.find(tl => tl.id === action.todolistId)
            if (filteredTodolist) {
                filteredTodolist.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
    }
}

export const getTodolistTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistAPI.getTodolists()
        .then( res => {
            dispatch(getTodolistsAC(res.data))
        })
}
