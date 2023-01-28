import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../utils";
import { Task, UsersState } from "../../types";



const BASE_URL = `http://localhost:3001/api/v1/todos`;
const token: string = getToken() as string

export const fetchTodos = createAsyncThunk("fetch_todo", async () => {
    const resp = await fetch(BASE_URL, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
    });
    const Data = await resp.json();
    console.log(Data, "respoo");

    return Data;
});

export const addNewTodo = createAsyncThunk("add_todo", async (todo: string) => {
    const newTodo = {
        // id: new Date().toString(),
        title: todo,
        completed: false,
    };
    await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            ...newTodo,
        }),
    });
    return newTodo;
});

export const deleteTodo = createAsyncThunk(
    "remove_todo",
    async (id: string) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
        });
        return id;
    }
);

export const updateTodo = createAsyncThunk(
    "update_todo",
    async ({
        name,
        id,
        completed,
    }: {
        name: string;
        id: string;
        completed: boolean;
    }) => {
        const newTodo = {
            title: name,
            completed,
        };
        await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                ...newTodo,
            }),
        });
        return { ...newTodo, id };
    }
);

const initialState = {
    todos: [],
    update: false,
} as UsersState;

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<any>) => ({
                ...state,
                todos: [...action.payload],
            }))
            .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<any>) => {
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload
                );
                state.todos.splice(index, 1);
            })
            .addCase(
                updateTodo.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        title: string;
                        id: string,
                        completed: boolean;
                    }>
                ) => {
                    const index = state.todos.findIndex(
                        (todo) => todo.id === action.payload.id
                    );
                    state.todos[index].title = action.payload.title;
                    state.todos[index].completed = action.payload.completed;
                }
            );
    },
});

export default todoSlice.reducer;
