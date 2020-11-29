import React, {ChangeEvent} from 'react';
import './App.css';
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, value: boolean) => void
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
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}
                            onChange={changeTaskStatus}
                            />
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
