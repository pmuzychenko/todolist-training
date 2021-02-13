import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodolists()
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.createTodolist('Redux-toolkit')
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '08e6e993-3614-4dc9-8af0-15919ba2f2bf'
    useEffect(() => {
       todolistAPI.deleteTodolist(todolistId)
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '06d5519a-4110-46d1-93ac-4d4bb9f4e8dc'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'Redux-Toolkit!!!!!')
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
