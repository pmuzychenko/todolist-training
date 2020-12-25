import React, {useCallback} from 'react';
import {FilterTaskValues, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, value: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilterForTask: (filter: FilterTaskValues, todolistId: string) => void
    _addNewTask: (title: string, todolistId: string) => void
    filter: FilterTaskValues
    id: string
    _removeTodolist: (todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    _onChangeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType>= React.memo(function (
    {id,title,tasks,changeTaskStatus,removeTask,changeFilterForTask,_addNewTask,filter,
        _removeTodolist,onChangeTaskTitle,_onChangeTodolistTitle}
    ) {
    console.log('Todolist is called')

    const onAllClickHandler = useCallback(() => {
        changeFilterForTask('All', id)
    }, [changeFilterForTask, id])
    const onActiveClickHandler = useCallback(() => {
        changeFilterForTask('Active', id)
    }, [changeFilterForTask, id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilterForTask('Completed', id)
    }, [changeFilterForTask, id])

    const addNewTask = useCallback((title: string) => {
        _addNewTask(title, id)
    }, [_addNewTask, id])


    const removeTodolist = useCallback(() => {
        _removeTodolist(id)
    }, [_removeTodolist, id])
    const onChangeTodolistTitle = useCallback((newTitle: string) => {
        _onChangeTodolistTitle(newTitle, id)
    }, [_onChangeTodolistTitle, id])

     let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    return (
        <div className='todolist'>
            <div>
                <h2><EditableSpan value={title} onChangeTitle={onChangeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h2>
            </div>
            <AddItemForm addItem={addNewTask}/>
            <div>
                {tasksForTodolist.map(task => <Task
                    key={task.id}
                    task={task} todolistId={id} removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus} onChangeTaskTitle={onChangeTaskTitle}
                />)}
            </div>
            <div className='buttons'>
                <Button
                    variant={'contained'}
                    color={filter === 'All' ? 'primary' : 'default'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'Active' ? 'primary' : 'default'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'Completed' ? 'primary' : 'default'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})


