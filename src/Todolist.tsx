import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterTaskValues, TaskType} from "./App";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, value: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilterForTask: (filter: FilterTaskValues, todolistId: string) => void
    addNewTask: (title: string, todolistId: string) => void
    filter: FilterTaskValues
    id: string
    removeTodolist: (todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void


}

function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilterForTask('All', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilterForTask('Active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilterForTask('Completed', props.id)
    }

    const addNewTask = (title:string) => {
            props.addNewTask(title, props.id)
    }


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div className='todolist'>
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolist}>X</button>
                </h3>
            </div>
            <AddItemForm addItem={addNewTask}/>
            <ul>
                {props.tasks.map(task => {
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    const onChangeTitle = (newTitle: string) => {
                        props.onChangeTaskTitle(task.id, newTitle, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={changeTaskStatus}
                            />
                            <EditableSpan value={task.title} onChangeTitle={onChangeTitle}/>
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
