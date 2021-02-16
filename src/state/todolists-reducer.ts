import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }

        case 'ADD-TODOLIST': {
            return [{
                ...action.todolist, filter: action.filter
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

//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addTodolistAC = (title: string, todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', title, todolist, filter: 'all'} as const)

export const changeTodolistTitleAC = (title: string, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-NAME',
    title,
    todolistId
} as const)

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todolistId
} as const)

export const getTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'GET-TODOLISTS', todolists} as const)

//thunks
export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => dispatch(getTodolistsAC(res.data)))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(title, res.data.data.item)))
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => dispatch(changeTodolistTitleAC(title, todolistId)))
}

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>