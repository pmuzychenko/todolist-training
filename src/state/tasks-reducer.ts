import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {TaskStateType} from "../AppWithRedux";
import {Dispatch} from 'redux';
import {AppRootStateType} from "./store";
import {addTodolistAC, getTodolistsAC, removeTodolistAC} from "./todolists-reducer";


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'REMOVE-TASK': {
           return  {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model}:t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}


//actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)


//thunks
export const SetTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const RemoveTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const AddTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch((addTaskAC(res.data.data.item)))
        })
}


export const UpdateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const tasksForCurrentTodolist = tasks[todolistId]
    const checkedTask = tasksForCurrentTodolist.find(task => task.id === taskId)
    if (!checkedTask) {
        console.warn('Task is not exist in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: checkedTask.deadline,
        description: checkedTask.description,
        priority: checkedTask.priority,
        startDate: checkedTask.startDate,
        status: checkedTask.status,
        title: checkedTask.title,
        ...domainModel
    }
    todolistAPI.updateTask(todolistId, taskId, apiModel)
        .then((res) => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
}

// types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}