import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTaskValues = 'All' | 'Active' | 'Completed'

function App() {
    //add hook useState for rerender UI
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterTaskValues>('All')
    let tasksForTodolist = tasks

    const changeTaskStatus = (id: string, newStatus: boolean) => {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = newStatus
            setTasks([...tasks])
        }
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    const addTask = () => {
        let newTask:TaskType = {
            id: v1(), title:"It's a new task", isDone: false
        }
        setTasks([...tasks,newTask])
    }

    const changeFilterForTask = (filter: FilterTaskValues) => {
        setFilter(filter)
    }

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      changeTaskStatus={changeTaskStatus}
                      removeTask={removeTask}
                      tasks={tasksForTodolist}
                      filter={changeFilterForTask}
                      addNewTask={addTask}
            />
        </div>
    );
}

export default App;
