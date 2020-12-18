import {v1} from "uuid";
import {FilterTaskValues, TodolistType} from "../../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "../todolists-reducer";
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
});

test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle, 'All'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
    expect(endState[2].filter).toBe('All')
});
test('correct todolist should change its name', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
});
test('correct filter of todolist should be changed', () => {
    const newFilter: FilterTaskValues = 'Completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
});
