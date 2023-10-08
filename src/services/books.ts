

import axios from 'axios';
import {TBook} from '@/types/index';

const axiosClient = axios.create({
    baseURL: 'http://localhost:9000'
});


export async function getBooks(): Promise<TBook[]> {
    try {
        const { data } = await axiosClient.get('/books');
        return data.data.books as TBook[];
    } catch(error)  {
        throw new Error("Error retrieving data");
    }
}

export async function setFavoriteBook(username:string, bookId: string) {
    try {
        const { data } = await axiosClient.post(`/users/${username}/favorites`, {book: bookId});
        return data.message;
    } catch(error)  {
        throw new Error("Error retrieving data");
    }
}

export async function getFavoriteBook(username:string) {
    try {
        const { data } = await axiosClient.get(`/users/${username}/favorites`);
        return data.data.favorites.book;
    } catch(error)  {
        throw new Error("Error retrieving data");
    }
}