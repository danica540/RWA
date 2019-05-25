import { Action } from "redux";
import { Book } from "../../models/Book";

//action creator, akcija je jedan prost tip
export const FETCH_BOOKS = "FETCH BOOKS";
export const SEARCH_BOOKS = "SEARCH BOOKS";

export interface FetchBooks extends Action { }

export function fetchBooks(): FetchBooks {
    return {
        type: FETCH_BOOKS
    };
}
export interface SearchBooks extends Action {
    text:string;
}

export function searchBooks(text:string): SearchBooks {
    return {
        type: SEARCH_BOOKS,
        text: text
    }
}