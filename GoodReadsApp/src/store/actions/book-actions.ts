import { Action } from "redux";
import { Book } from "../../models/Book";

//action creator, akcija je jedan prost tip
export const GET_BOOKS = "GET BOOKS";
export const SEARCH_BOOKS = "SEARCH BOOKS";
export const CHANGE_STATE = "CHANGE STATE";
export const GET_BOOKS_BY_GENRE = "GET BOOKS BY GENRE";

export interface GetBooks extends Action {
}

export function getBooks(): GetBooks {
    return {
        type: GET_BOOKS
    };
}

export interface GetBooksByGenre extends Action {
    text: string
}

export function getBooksByGenre(genre: string): GetBooksByGenre {
    return {
        type: GET_BOOKS_BY_GENRE,
        text: genre
    };
}
export interface SearchBooks extends Action {
    text: string;
}

export function searchBooks(text: string): SearchBooks {
    return {
        type: SEARCH_BOOKS,
        text: text
    }
}

export interface ChangeState extends Action {
    books: Book[]
}

export function changeState(books: Book[]): ChangeState {
    return {
        type: CHANGE_STATE,
        books: books
    }
}

