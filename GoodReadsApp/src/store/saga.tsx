import { getAllBooks } from "../services/book.service";
import { put } from "@redux-saga/core/effects";
import { getBooksByGenre, changeState } from "./actions/book-actions";

export  function* fetchBooks(){ //poziva API
    const books = yield getAllBooks();
    //const response = yield apicall(); //asinhroni poziv!!! cekamo da se izvrsi asinhroni poziv ka apiju 
    yield put(changeState(books));//callAddBooksAction(response);
}