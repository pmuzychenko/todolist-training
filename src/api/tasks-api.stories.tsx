import React, {useEffect, useState} from 'react'
import {todolistAPI, UpdateTaskModelType} from "./todolist-api";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTasks('6b2ba53c-0718-4781-afd0-10251bbd33c8')
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'First task!'
        todolistAPI.createTask('6b2ba53c-0718-4781-afd0-10251bbd33c8',title)
            .then( res => {
                setState(res.data.data.item)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = '60b16fbd-1bd6-4b62-9413-4b0651770e02'
        todolistAPI.deleteTask('6b2ba53c-0718-4781-afd0-10251bbd33c8',taskId)
            .then( res => {
                setState(res.status)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const task: UpdateTaskModelType = {
            title: 'React-toolkit!!!',
            description: 'Testing!',
            status: 200,
            priority: 1,
            startDate: '',
            deadline: ''
        }
        const taskId = '29c99c1e-0eab-4992-ad1d-45de9c45b66c'
        todolistAPI.updateTask('6b2ba53c-0718-4781-afd0-10251bbd33c8',taskId,task)
            .then( res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}