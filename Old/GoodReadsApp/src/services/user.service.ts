
const url = 'http://localhost:3002/users/';

export function getUserById(id: string) {
    return fetch(url + id)
        .then(response => response.json());
}