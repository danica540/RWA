
import { Action } from "redux";
import {  ADD_BOOKS, AddBooks } from "./actions";
import { Book } from "../models/Book";
import { getAllBooks } from "../services/book.service";

const initialState: any = getAllBooks();
export function booksReducer(state: Book[] = initialState, action: Action){ //ako state nije naveden da bude inicijalno!
    switch(action.type) {
        case ADD_BOOKS: {
            const {books} = action as AddBooks;
            // u trenutni state, doda novu knjigu
            return [...state, ...books];//...spread operator? rasturi elemente i onda napravi novi niz
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}