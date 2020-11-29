import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: string
    title: string
    isDone:boolean
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}
    ])
    return (
        <div className="App">
           <Todolist title={'What to learn'}
                     tasks={tasks}
           />
        </div>
    );
}

export default App;
