import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterTaskValues, TaskType} from "./App";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";

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
    onChangeTodolistTitle: (newTitle: string, todolistId: string) => void
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

    const addNewTask = (title: string) => {
        props.addNewTask(title, props.id)
    }


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const onChangeTodolistTitle = (newTitle: string) => {
        props.onChangeTodolistTitle(newTitle, props.id)
    }


    return (
        <div className='todolist'>
            <div>
                <h2><EditableSpan value={props.title} onChangeTitle={onChangeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h2>
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
                        <div className='tasks'>
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                {/*<input type="checkbox" checked={task.isDone}*/}
                                {/*       onChange={changeTaskStatus}*/}
                                {/*/>*/}
                                <Checkbox checked={task.isDone}
                                          onChange={changeTaskStatus}
                                          color='primary'
                                />
                                <EditableSpan value={task.title} onChangeTitle={onChangeTitle}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        </div>

                    )
                })}
            </ul>
            <div className='buttons'>
                <Button
                    variant={'contained'}
                    color={props.filter === 'All' ? 'primary' : 'default'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'Active' ? 'primary' : 'default'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'Completed' ? 'primary' : 'default'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}

export default Todolist;
