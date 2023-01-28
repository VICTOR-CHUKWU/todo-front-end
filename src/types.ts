export interface formdata {
    username: string;
    email: string,
    password: string
}

export interface Task {
    id: String;
    title: String;
    completed: boolean;
}
export interface UsersState {
    todos: Task[];
    update: boolean;
}