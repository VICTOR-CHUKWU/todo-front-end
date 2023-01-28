import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { fetchTodos } from '../redux/todo/todoSlice';
import { Task } from '../types';
import TodoListItem from './TodoListItem';

const TodoList = () => {
    const todoList = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos());
        console.log('disptached');
    }, [dispatch])


    if (!todoList.length) {
        return <h4 data-testid='todo-list' className='text-white'>No todo</h4>
    }
    return (
        <section data-testid='todo-list' className='todo-list-container'>
            {
                todoList.map((todo: Task) => (
                    <TodoListItem key={todo.id as string} todo={todo as Task} />
                ))
            }
        </section>
    )
}

export default TodoList