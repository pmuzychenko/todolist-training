import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {FilterValuesType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {useDispatch} from "react-redux";
import {SetTasksTC} from "./tasks-reducer";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilterForTask: (filter: FilterValuesType, todolistId: string) => void
    _addNewTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    _removeTodolist: (todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    _onChangeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo(function (
    {
        id, title, tasks, changeTaskStatus, removeTask, changeFilterForTask, _addNewTask, filter,
        _removeTodolist, onChangeTaskTitle, _onChangeTodolistTitle
    }
) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SetTasksTC(id))
    }, [tasks])

    const onAllClickHandler = useCallback(() => {
        changeFilterForTask('all', id)
    }, [changeFilterForTask, id])

    const onActiveClickHandler = useCallback(() => {
        changeFilterForTask('active', id)
    }, [changeFilterForTask, id])

    const onCompletedClickHandler = useCallback(() => {
        changeFilterForTask('completed', id)
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

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
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
                    color={filter === 'all' ? 'primary' : 'default'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'active' ? 'primary' : 'default'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'completed' ? 'primary' : 'default'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})


