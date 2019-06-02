import { urlConst } from "../constants/constants";

export function getAllImages() {
    return fetch(urlConst.URL)
        .then(response => response.json());
}