import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterTaskValues, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, value: boolean) => void
    removeTask: (id: string) => void
    changeFilterForTask: (filter: FilterTaskValues) => void
    addNewTask: (title: string) => void
    filter: FilterTaskValues

}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onAllClickHandler = () => {
        props.changeFilterForTask('All')
    }
    const onActiveClickHandler = () => {
        props.changeFilterForTask('Active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilterForTask('Completed')
    }

    const addNewTask = () => {
        if (title.trim() !== '') {
            props.addNewTask(title)
            setTitle('')
        } else {
            setError('The title is required')
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()
        }
    }

    return (
        <div className='todolist'>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <input type="text" value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onPressKeyHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
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
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
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
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
