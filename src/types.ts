export interface formdata {
    username: string;
    email: string,
    password: string
}

export interface Task {
    id: string;
    title: String;
    completed: boolean;
}
export interface UsersState {
    todos: Task[];
    update: boolean;
}