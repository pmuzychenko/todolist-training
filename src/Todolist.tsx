import React from 'react';
import './App.css';
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

function Todolist(props:PropsType) {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map( task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
