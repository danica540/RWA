
import { Action } from "redux";
import { SEARCH_BOOKS, searchBooks, GET_BOOKS, SearchBooks } from "../actions/book-actions";
import { Book } from "../../models/Book";
import { getBooksBySearch } from "../../services/book.service";

const initialState: Book[] = [
    {
        "id": "81",
        "author": "Albert Camus",
        "genre": "classic",
        "title": "The Stranger",
        "cover": "../resources/stranger.jpg"
    },
    {
        "id": "82",
        "author": "Franz Kafka",
        "genre": "fantasy",
        "title": "The Metamorphosis",
        "cover": "../resources/franz.jpeg"
    },
    {
        "id": "83",
        "author": "Hermann Hesse",
        "genre": "philosophy",
        "title": "Siddhartha",
        "cover": "../resources/hese.jpg"
    },
    {
        "id": "84",
        "author": "Vladimir Nabokov",
        "genre": "classic",
        "title": "Lolita",
        "cover": "../resources/lolita.jpg"
    },
    {
        "id": "85",
        "author": "William Shakespeare",
        "genre": "drama",
        "title": "Macbeth ",
        "cover": "../resources/macbeth.jpg"
    },
    {
        "id": "86",
        "author": "Ernest Hemingway",
        "genre": "classic",
        "title": "The Old Man and the Sea ",
        "cover": "../resources/sea.jpg"
    }
];

export function bookReducer(state: Book[] = initialState, action: Action) { //ako state nije naveden da bude inicijalno!
    switch (action.type) {
        case SEARCH_BOOKS: {

            /*
            const {bookId} = action as DeleteBook;//const bookId = (action as DeleteBook).bookId; const type = (action as DeleteBook).type;
            return state.filter((book: Book) => book.isbn !== bookId);*/
            const textValue = (action as SearchBooks).text;
            const newState=state.filter((book:Book)=>book.title===textValue)
            return {
                ...state,
                initialState: newState
            }
        }
        case GET_BOOKS: {
            return state;
        }
        default:
            return state; //uvek mora da ima default koji vraca staro stanje
    }
}