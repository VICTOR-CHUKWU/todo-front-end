import api from "./axios";
import { formdata } from "../types";


export const signUp = async (data: formdata) => {
    const resp = await api.post('/auth/signup', data)
    return resp
}

export const signIn = async (data: formdata) => {
    const resp = await api.post('/auth/signin', data)
    return resp
}