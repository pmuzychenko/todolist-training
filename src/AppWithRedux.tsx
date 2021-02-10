import React, {useCallback} from 'react';
import {Todolist} from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskValues
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterTaskValues = 'All' | 'Active' | 'Completed'


function AppWithRedux() {
    //add hook useState for rerender UI
    console.log('AppWithRedux is called')

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const changeTaskStatus = useCallback((id: string, newStatus: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(id, newStatus, todolistId))
    },[dispatch]);
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTaskAC(id, todolistId))
    },[dispatch]) ;

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddTaskAC(title, todolistId))
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    },[dispatch]);
    const onChangeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTaskTitleAC(id, newTitle,todolistId))
    },[dispatch]);

    const onChangeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC(newTitle,todolistId))
    },[dispatch]);
    const changeFilterForTask = useCallback((filter: FilterTaskValues, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(filter,todolistId))
    },[dispatch]);

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
            </Container>
        </div>
    );
}

export default AppWithRedux;
