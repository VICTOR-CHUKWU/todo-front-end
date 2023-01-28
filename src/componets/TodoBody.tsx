import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const TodoBody = () => {
    return (
        <section className='todo-body'>
            <TodoInput />
            <TodoList />
        </section>
    )
}

export default TodoBody