import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {
    changeTodolistFilterAC,
    createTodolistTC, FilterValuesType,
    getTodolistTC,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./todolists-reducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {AddTaskTC, RemoveTaskTC, UpdateTaskTC} from "./tasks-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {TaskStateType} from "../../../app/AppWithRedux";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo=false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTodolistTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, []);

    const onChangeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(updateTodolistTitleTC(todolistId, newTitle))
    }, []);

    const changeFilterForTask = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, []);

    const changeTaskStatus = useCallback((id: string, newStatus: TaskStatuses, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, id, {status: newStatus}))
    }, []);

    const onChangeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, id, {title: newTitle}))
    }, []);

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddTaskTC(todolistId, title))
    }, []);

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {

                        let tasksForTodolist = tasks[tl.id]

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist title={tl.title}
                                          id={tl.id}
                                          key={tl.id}
                                          entityStatus={tl.entityStatus}
                                          changeTaskStatus={changeTaskStatus}
                                          removeTask={removeTask}
                                          tasks={tasksForTodolist}
                                          changeFilterForTask={changeFilterForTask}
                                          _addNewTask={addTask}
                                          filter={tl.filter}
                                          _removeTodolist={removeTodolist}
                                          onChangeTaskTitle={onChangeTaskTitle}
                                          _onChangeTodolistTitle={onChangeTodolistTitle}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}