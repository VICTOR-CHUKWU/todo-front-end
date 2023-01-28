import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { addNewTodo, fetchTodos } from '../redux/todo/todoSlice';

const TodoInput = () => {
    const [title, setInputText] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputText(
            value
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(addNewTodo(title));
            console.log(title);
            setInputText('');
            setTimeout(() => {
                dispatch(fetchTodos())
            }, 500);
        } else {
            alert('Please write item');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="Add Todo..." value={title} onChange={onChange} className="input-text" />
            <button type="submit" className="input-submit">Add</button>
        </form>
    )
}

export default memo(TodoInput)