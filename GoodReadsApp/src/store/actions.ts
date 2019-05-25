import { Action } from "redux";
import { Book } from "../models/Book";

//action creator, akcija je jedan prost tip
export const FETCH_BOOKS = "FETCH BOOKS";
export const ADD_BOOKS = "ADD BOOKS";

export interface FetchBooks extends Action { }

export function fetchBooks(): FetchBooks {
    return {
        type: FETCH_BOOKS
    };
}
export interface AddBooks extends Action {
    books: Book[]
}

export function addBooks(books: Book[]): AddBooks {
    return {
        type: ADD_BOOKS,
        books: books // moze u ES6 samo books da se stavi, on uzima vrednost od ove sto se isto zove
    }
}