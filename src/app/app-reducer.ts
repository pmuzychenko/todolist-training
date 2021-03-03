import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorType = string | null

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ResponseErrorType,
    isInitialized: false
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'APP/SET-ERROR': {
            return {
                ...state,
                error: action.error
            }
        }
        case 'APP/SET-INITIALIZED': {
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        }

        default:
            return state
    }
}
type ActionsType = setAppStatusActionType | setAppErrorActionType | setAppInitializedActionType
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ResponseErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedValueAC = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    isInitialized
} as const)


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => dispatch(setAppInitializedValueAC(true)))
}

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitializedValueAC>



