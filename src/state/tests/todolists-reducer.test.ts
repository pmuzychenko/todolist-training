import {v1} from "uuid";
import {useState} from "react";
import {TodolistType} from "../../App";
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
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
    expect(endState[2].filter).toBe('All')
});