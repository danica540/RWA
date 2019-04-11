export function hide_element(element) {
    element.style.display = "none";
}

export function make_element_visible(element) {
    element.style.display = "flex";
}

export function change_text_in_an_element(element, new_text) {
    element.innerHTML = new_text;
}

export function return_capitalized_username(username) {
    const nameCapitalized = username.charAt(0).toUpperCase() + username.slice(1);
    return nameCapitalized;
}

export function current_date(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;
    return today;
}
