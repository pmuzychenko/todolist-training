import React, {useReducer} from 'react';
import {v1} from 'uuid';
import {Todolist} from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
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

function AppWithReducers() {
    //add hook useState for rerender UI

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'Active'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Butter', isDone: true},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Tomato', isDone: false},
            {id: v1(), title: 'Potato', isDone: false}
        ]
    })


    const changeTaskStatus = (id: string, newStatus: boolean, todolistId: string) => {
        dispatchToTasks(ChangeTaskStatusAC(id, newStatus, todolistId))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(RemoveTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(AddTaskAC(title, todolistId))
    }

    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }
    const onChangeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(ChangeTaskTitleAC(id, newTitle,todolistId))
    }

    const onChangeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(newTitle,todolistId))
    }
    const changeFilterForTask = (filter: FilterTaskValues, todolistId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC(filter,todolistId))
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

export default AppWithReducers;
