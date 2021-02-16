import React, {useCallback, useEffect} from 'react';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    changeTodolistFilterAC, createTodolistTC,
    FilterValuesType,
    getTodolistTC, removeTodolistTC,
    TodolistDomainType, updateTodolistTC
} from "../features/TodolistsList/Todolist/todolists-reducer";
import {
    AddTaskTC,
    RemoveTaskTC, UpdateTaskTC
} from "../features/TodolistsList/Todolist/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskStatuses, TaskType} from "../api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    //add hook useState for rerender UI


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container>


                <TodolistsList />
            </Container>
        </div>
    );
}

type TodolistsListPropsType = {}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch]);

    const onChangeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(updateTodolistTC(todolistId, newTitle))
    }, [dispatch]);

    const changeFilterForTask = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch]);

    const changeTaskStatus = useCallback((id: string, newStatus: TaskStatuses, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, id, {status: newStatus}))
    }, [dispatch]);

    const onChangeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, id, {title: newTitle}))
    }, [dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTaskTC(todolistId, id))
    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddTaskTC(todolistId, title))
    }, [dispatch]);

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
                                          changeTaskStatus={changeTaskStatus}
                                          removeTask={removeTask}
                                          tasks={tasksForTodolist}
                                          changeFilterForTask={changeFilterForTask}
                                          _addNewTask={addTask}
                                          filter={tl.filter}
                                          _removeTodolist={removeTodolist}
                                          onChangeTaskTitle={onChangeTaskTitle}
                                          _onChangeTodolistTitle={onChangeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}
export default AppWithRedux;
