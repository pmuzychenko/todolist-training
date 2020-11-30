import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {FilterTaskValues, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, value: boolean) => void
    removeTask: (id: string) => void
    filter: (filter: FilterTaskValues) => void
    addNewTask: (title: string) => void

}

function Todolist(props: PropsType) {
    const [title,setTitle] = useState('')

    const onAllClickHandler = () => {
        props.filter('All')
    }
    const onActiveClickHandler = () => {
        props.filter('Active')
    }
    const onCompletedClickHandler = () => {
        props.filter('Completed')
    }

    const addNewTask = () => {
        props.addNewTask(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    return (
        <div className='todolist'>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <input type="text" value={title}
                       onChange={onChangeTitle}

                />
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(task.id)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={changeTaskStatus}
                            />
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div className='buttons'>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
