import {v1} from "uuid";
import {useState} from "react";
import {FilterTaskValues, TodolistType} from "../../App";
import {todolistsReducer} from "../todolists-reducer";

test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
});

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    const action = {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        filter: 'All'
    }
    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
    expect(endState[2].filter).toBe('All')
});
test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-NAME',
        id: todolistId2,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState, action)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
});
test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newFilter: FilterTaskValues = 'Completed'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }
    const endState = todolistsReducer(startState, action)
    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
});
