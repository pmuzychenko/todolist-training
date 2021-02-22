import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestStatusType>( state => state.appStatus.status)
    return (
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

            <Container>
                <TodolistsList />
            </Container>

        </div>
    );
}


export default AppWithRedux;
