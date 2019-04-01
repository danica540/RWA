import {hide_element,make_element_visible,change_text_in_an_element,return_capitalized_username} from "./basic-functions";

export function sign_in_view(sign_in_form,news_view,error_div){
    hide_element(news_view);
    make_element_visible(sign_in_form);
    hide_element(error_div);
}

export function change_to_news_browsing_mode(sign_in_form,news_view,error_div,profile_link,sign_in_link,username, profile_menu){
    make_element_visible(news_view);
    hide_element(sign_in_form);
    hide_element(error_div);
    change_text_in_an_element(sign_in_link,"Sing out");
    change_text_in_an_element(profile_link,return_capitalized_username(username));
    make_element_visible(profile_link);
    make_element_visible(profile_menu);
}

function clear_log_in_inputs(username_input,password_input){
    username_input.value="";
    password_input.value="";
}

export function validate_user(username_input,password_input,sign_in_form,news_view,error_div,profile_link,sign_in_link, profile_menu){
    fetch("http://localhost:3000/users?username="+username_input.value+"&password="+password_input.value)
    .then(res=>{
        if(!res.ok){
            throw new Error(res.statusText);
        }
        else{
            return res.json();
        }
    })
    .then(user=>{
        if(user.length === 0){
            clear_log_in_inputs(username_input,password_input);
            let error_label=document.getElementById("error-message");
            display_error_message(error_div,error_label);
        }
        else{
            clear_log_in_inputs(username_input,password_input);
            change_to_news_browsing_mode(sign_in_form,news_view,error_div,profile_link,sign_in_link,user[0].username, profile_menu);
        }
    })
    .catch(err=>console.log(err))
}

export function is_sign_in_mode(sign_in_button){
    if(sign_in_button.value === "Sign in"){
        return true;
    }
    else{
        return false;
    }
}

export function change_to_sign_up_mode(sign_in_label,sign_in_button,sign_up_div,error_div){
    change_text_in_an_element(sign_in_label,"Sing up");
    sign_in_button.value="Sing up";
    hide_element(sign_up_div);
    hide_element(error_div);
}

export function display_error_message(error_div,error_label){
    error_div.style.display="flex";
    error_label.innerHTML="Invalid login, please try again";
}