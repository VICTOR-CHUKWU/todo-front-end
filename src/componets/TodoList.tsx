import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { fetchTodos } from '../redux/todo/todoSlice';
import { Task } from '../types';
import TodoListItem from './TodoListItem';

const TodoList = () => {
    const todoList = useSelector((state: RootState) => state.todos);
    console.log(todoList, 'listss');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])


    if (!todoList.length) {
        return <h4 data-testid='todo-list' className='text-white'>No todo</h4>
    }
    return (
        <section data-testid='todo-list' className='todo-list-container'>
            {
                todoList.map((todo: Task, i) => (
                    <TodoListItem key={todo.id} todo={todo as Task} />
                ))
            }
        </section>
    )
}

export default TodoList