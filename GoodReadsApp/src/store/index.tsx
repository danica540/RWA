import { combineReducers } from "redux";
import { Book } from "../models/Book";
import { bookReducer } from "./reducers/book-reducer";

export interface AppState {
    books: Book[];
}
export const rootReducer = combineReducers({
    books: bookReducer
    //, selected: selectedReducer
    // ne buni se ako dodamo inicijalno stanje

    // domaci, jos jedan reducer koji se da vrsi selected book, book da imas stanje, ako nista nije selektovano onda je null 
})
