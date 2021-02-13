import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b9ba1f54-fd53-4073-a80c-f6586b8bff61'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}



type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}



export const todolistAPI = {
    getTodolists(){
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
}