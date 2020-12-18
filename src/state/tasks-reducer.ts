import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-NAME'
    taskId: string
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType |
    ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType  => ({type:'REMOVE-TASK', taskId, todolistId })
export const AddTaskAC = (title: string, todolistId: string): AddTaskActionType  => ({type:'ADD-TASK', title,todolistId })
export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => ({type:'CHANGE-TASK-NAME', taskId, title, todolistId })
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) : ChangeTaskStatusActionType => ({type:'CHANGE-TASK-STATUS', taskId, isDone, todolistId })

const initialState: TaskStateType = {}
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-NAME':
            return {...state, [action.todolistId]: state[action.todolistId].map( task => {
                    if (task.id !== action.taskId) return task
                    else return {...task, title: action.title}})}

        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map( task => {
                if (task.id !== action.taskId) return task
                    else return {...task, isDone: action.isDone}})}
        case 'ADD-TODOLIST':
            return {...state,[action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}