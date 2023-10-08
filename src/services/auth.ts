

import axios from 'axios';
import {TUser} from "@/types/index";

const axiosClient = axios.create({
    baseURL: 'http://localhost:9000'
});


export async function signIn(user: TUser) {
    try {
        const {username, password} = user;
        const { data } = await axiosClient.post('/login', {username, password});
        return data.message;
    } catch(error)  {
        return "error"
    }
}

export async function signUp(user: TUser) {
    try {
        const {username, password} = user;
        const { data } = await axiosClient.post('/users/new', {username, password});
        return data.message;
    } catch(error)  {
        return "error"
    }
}