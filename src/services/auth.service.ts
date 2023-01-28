const BASE_URL = `http://localhost:3001/api/auth`;
import { formdata } from "../types";


export const signUp = async (data: formdata) => {
    const resp = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...data,
        }),
    });
    return resp
}

export const signIn = async (data: formdata) => {
    const resp = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...data,
        }),
    });
    return resp
}