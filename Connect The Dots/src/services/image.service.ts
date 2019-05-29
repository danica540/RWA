
const url = 'http://localhost:3002/images/';

export function getAllImages() {
    return fetch("http://localhost:3002/images")
        .then(response => response.json());
}

export function getImage(id: number) {
    return fetch("http://localhost:3002/images/"+id)
        .then(response => response.json());
}