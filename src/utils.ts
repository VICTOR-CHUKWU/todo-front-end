export const getToken = () => {
    const token = localStorage.getItem('todo-token');
    return token
}

export const saveToken = (token: string) => {
    localStorage.setItem('todo-token', token)
}