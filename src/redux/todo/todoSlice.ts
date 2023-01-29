import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAdd, todoGet, todoRemove, todoUpdate } from "../../services/todo.service";
import { Task, UsersState } from "../../types";



export const fetchTodos = createAsyncThunk("fetch_todo", async () => {
    const resp = await todoGet()
    const Data = resp.data;
    const data = Data.sort((a: Task, b: Task) => Number(a.id) - Number(b.id))
    return data;
});

export const addNewTodo = createAsyncThunk("add_todo", async (todo: string) => {
    const newTodo = {
        // id: new Date().toString(),
        title: todo,
        completed: false,
    };
    await todoAdd(todo)
    return newTodo;
});

export const deleteTodo = createAsyncThunk(
    "remove_todo",
    async (id: string) => {
        await todoRemove(id)
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
            id
        };
        await todoUpdate(newTodo)
        return newTodo;
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
            // .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<any>) => {
            //     state.todos.push(action.payload);
            // })
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
