import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, value: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(({task,todolistId,changeTaskStatus,onChangeTaskTitle,removeTask}) => {
    console.log('Task is called')
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    }

    const removeTaskHandler = () => {
        removeTask(task.id, todolistId)
    }

    const onChangeTitle = useCallback((newTitle: string) => {
        onChangeTaskTitle(task.id, newTitle, todolistId)
    },[onChangeTaskTitle,task.id,todolistId])

    return (
        <div className='tasks'>
            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox checked={task.isDone}
                          onChange={changeTaskStatusHandler}
                          color='primary'
                />
                <EditableSpan value={task.title} onChangeTitle={onChangeTitle}/>
                <IconButton onClick={removeTaskHandler}>
                    <Delete/>
                </IconButton>
            </div>
        </div>
    )
})