
import { Action } from "redux";
import { SEARCH_BOOKS, searchBooks, FETCH_BOOKS, SearchBooks } from "../actions/book-actions";
import { Book } from "../../models/Book";
import { getAllBooks, getBooksBySearch } from "../../services/book.service";

const initialState: any = getAllBooks();

export function bookReducer(state: Book[] = initialState, action: Action) { //ako state nije naveden da bude inicijalno!
    switch (action.type) {
        case SEARCH_BOOKS: {
            const newState = getBooksBySearch((action as SearchBooks).text);
            return {
                ...state,
                initialState: newState
            }
        }
        case FETCH_BOOKS: {
            return state;
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}