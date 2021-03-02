import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>( state => state.appStatus.status)
    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar />
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
                    {status === 'loading' && <LinearProgress color={'secondary'} />}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={'/404'} render={() => <h1> 404: Page not found!</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    );
}


export default AppWithRedux;
