
import { Action } from "redux";
import { SEARCH_BOOKS, searchBooks, GET_BOOKS, SearchBooks, CHANGE_STATE, ChangeState } from "../actions/book-actions";
import { Book } from "../../models/Book";
import { getBooksBySearch } from "../../services/book.service";

const initialState: Book[] = [];

export function bookReducer(state: Book[] = initialState, action: Action) { //ako state nije naveden da bude inicijalno!
    switch (action.type) {
        case SEARCH_BOOKS: {

            /*
            const {bookId} = action as DeleteBook;//const bookId = (action as DeleteBook).bookId; const type = (action as DeleteBook).type;
            return state.filter((book: Book) => book.isbn !== bookId);*/
            const textValue = (action as SearchBooks).text;
            const newState = state.filter((book: Book) => book.title === textValue)
            return newState;
        }
        case CHANGE_STATE: {
            const { books } = (action as ChangeState);
            const newState = books;
            return newState;
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}