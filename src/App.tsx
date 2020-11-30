import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterTaskValues
}

export type FilterTaskValues = 'All' | 'Active' | 'Completed'

function App() {
    //add hook useState for rerender UI

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'Active'}
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Butter', isDone: true},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Tomato', isDone: false},
            {id: v1(), title: 'Potato', isDone: false}
        ]
    })


    const changeTaskStatus = (id: string, newStatus: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = newStatus
            setTasks({...tasks})
        }
    }
    const removeTask = (id: string,todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        tasks[todolistId] = [newTask,...todolistTasks ]
        setTasks({...tasks})
    }

    const changeFilterForTask = (filter: FilterTaskValues, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks
                    if (tl.filter === 'Active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                    }
                    if (tl.filter === 'Completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                    }
                    return <Todolist title={tl.title}
                                     id={tl.id}
                                     key={tl.id}
                                     changeTaskStatus={changeTaskStatus}
                                     removeTask={removeTask}
                                     tasks={tasksForTodolist}
                                     changeFilterForTask={changeFilterForTask}
                                     addNewTask={addTask}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
