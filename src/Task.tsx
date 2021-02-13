
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(({task,todolistId,changeTaskStatus,onChangeTaskTitle,removeTask}) => {
    console.log('Task is called')

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);


    const removeTaskHandler = () => {
        removeTask(task.id, todolistId)
    }

    const onChangeTitle = useCallback((newTitle: string) => {
        onChangeTaskTitle(task.id, newTitle, todolistId)
    },[onChangeTaskTitle,task.id,todolistId])

    return (
        <div className='tasks'>
            <div key={task.id} className={task.status ? 'is-done' : ''}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
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