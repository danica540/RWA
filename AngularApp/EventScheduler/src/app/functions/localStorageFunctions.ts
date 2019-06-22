export function setLocalStorage(username: string, id: string) {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", id);
    localStorage.setItem("isLoggedIn", "true");
}

export function cleearLocalStorage() {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
}