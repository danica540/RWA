import { getAllBooks } from "../services/book.service";
import { put } from "@redux-saga/core/effects";
import { getBooksByGenre, changeState } from "./actions/book-actions";
import { getUserById } from "../services/user.service";
import { changeUserState } from "./actions/user-actions";

export  function* fetchBooks(){ //poziva API
    const books = yield getAllBooks();
    yield put(changeState(books));//callAddBooksAction(response);
}

export  function* fetchUser(id:string){ //poziva API
    const user = yield getUserById(id);
    yield put(changeUserState(user));//callAddBooksAction(response);
}