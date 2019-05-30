
const url = 'http://localhost:3002/images';

export function getAllImages() {
    return fetch(url)
        .then(response => response.json());
}