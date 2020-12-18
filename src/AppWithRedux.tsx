import React from 'react';
import AddItemForm from './AddItemForm';
import Todolist from './Todolist';
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

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const changeTaskStatus = (id: string, newStatus: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(id, newStatus, todolistId))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatch(RemoveTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(AddTaskAC(title, todolistId))
    }

    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    const onChangeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTaskTitleAC(id, newTitle,todolistId))
    }

    const onChangeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC(newTitle,todolistId))
    }
    const changeFilterForTask = (filter: FilterTaskValues, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(filter,todolistId))
    }

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
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist title={tl.title}
                                              id={tl.id}
                                              key={tl.id}
                                              changeTaskStatus={changeTaskStatus}
                                              removeTask={removeTask}
                                              tasks={tasksForTodolist}
                                              changeFilterForTask={changeFilterForTask}
                                              addNewTask={addTask}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              onChangeTaskTitle={onChangeTaskTitle}
                                              onChangeTodolistTitle={onChangeTodolistTitle}
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
