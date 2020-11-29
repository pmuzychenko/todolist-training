import React, {useDebugValue, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    //add hook useState for rerender UI
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}
    ])

    const changeTaskStatus = (id: string, newStatus: boolean) => {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = newStatus
            setTasks([...tasks])
        }
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
