export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ResponseErrorType
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState ,action: ActionsType):InitialStateType => {
    switch (action.type){
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
        default:
            return state
    }
}
type ActionsType = setAppStatusActionType | setAppErrorActionType
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ResponseErrorType) => ({type: 'APP/SET-ERROR', error} as const)

type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
