
const url = 'http://localhost:3001/books' //ovde podizemo json server

export function getAllBooks(){
    return fetch(url)
        .then(response => response.json());
}