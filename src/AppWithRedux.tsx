import React, {useCallback, useEffect} from 'react';
import {Todolist} from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    getTodolistTC,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskAC,
    AddTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    RemoveTaskTC, UpdateTaskStatusTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}



function AppWithRedux() {
    //add hook useState for rerender UI

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect( () => {
  dispatch(getTodolistTC())
    }, [])




    const changeTaskStatus = useCallback((id: string, newStatus: TaskStatuses, todolistId: string) => {
        dispatch(UpdateTaskStatusTC(todolistId, id, newStatus))
        // dispatch(changeTaskStatusAC(id, newStatus, todolistId))
    }, [dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTaskTC(todolistId,id))
    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddTaskTC(todolistId,title))
     //   dispatch(addTaskAC(title, todolistId))
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch]);
    const onChangeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch]);

    const onChangeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }, [dispatch]);

    const changeFilterForTask = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch]);

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
