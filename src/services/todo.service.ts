import api from "./axios";
import { Task } from "../types";

export const todoGet = async () => {
    const resp = await api.get('/v1/todos')
    return resp
}

export const todoAdd = async (todo: string) => {
    const newTodo = {
        title: todo,
        completed: false,
    };
    const resp = await api.post('/v1/todos', newTodo)
    return resp
}

export const todoRemove = async (id: string) => {
    const resp = await api.delete(`/v1/todos/${id}`)
    return resp
}

export const todoUpdate = async (task: Task) => {
    const newTodo = {
        title: task.title,
        completed: task.completed,
    };
    const resp = await api.put(`/v1/todos/${task.id}`, newTodo)
    return resp
}