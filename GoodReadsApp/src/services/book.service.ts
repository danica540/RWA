
const url = 'http://localhost:3002/books' //ovde podizemo json server

export function getAllBooks() {
    return fetch(url)
        .then(response => response.json());
}

export function getBooksBySearch(text) {
    return fetch(url + "/?q=" + text)
        .then(response => response.json());
}