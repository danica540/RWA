export function hide_element(element){
    element.style.display="none";
}

export function make_element_visible(element){
    element.style.display="flex";
}

export function change_text_in_an_element(element,new_text){
    element.innerHTML=new_text;
}

export function return_capitalized_username(username){
    const nameCapitalized = username.charAt(0).toUpperCase() + username.slice(1);
    return nameCapitalized;

}