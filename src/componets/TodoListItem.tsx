import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { deleteTodo, updateTodo } from '../redux/todo/todoSlice';
import { Task } from '../types';

const TodoListItem = ({ todo }: { todo: Task }) => {
    const [isdelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [title, setInputText] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const deleteTodd = (id: string) => {
        console.log(id, 'polio-id');
        setIsDelete(true)
        setTimeout(() => {
            dispatch(deleteTodo(id))
        }, 1500);
    }

    const editTodo = (value: string) => {
        setInputText(value)
        setIsEdit(true)

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputText(
            value
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(updateTodo({ name: title, id: todo.id as string, completed: todo.completed }));
            setInputText('');
            setIsEdit(false)
        } else {
            alert('Please write item');
        }
    };
    return (
        <div data-testid='todo-list-item' className={`todo-item ${isdelete ? 'fall' : ''}`}>
            <span className='todo-item-first'>
                <input
                    type="checkbox"
                    className='checkbox mr-2'
                    checked={todo.completed}
                    onChange={() => dispatch(updateTodo({ completed: !todo.completed, id: todo.id as string, name: todo.title as string }))}
                />
                <span className={`${todo.completed && 'todo-item-first-span'}`}>{todo.title}</span>
            </span>
            <span className='flex'>
                <button type="button" onClick={() => editTodo(todo.title as string)} className='mr-2'>edit</button>
                <button type="button" onClick={() => deleteTodd(todo.id as string)}>Delete</button>
            </span>
            <form onSubmit={handleSubmit} className={`${isEdit ? 'form-container-list' : 'form-hidden'}`}>
                <input type="text" placeholder="Add Todo..." value={title} onChange={onChange} className="input-text" />
                <button type="button" className="input-submit mr-2" onClick={() => setIsEdit(false)}>cancel</button>
                <button type="submit" className="input-submit">save</button>
            </form>
        </div>
    )
}

export default TodoListItem