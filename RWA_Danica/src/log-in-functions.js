
export function default_view(sign_in_form,news_view,error_div){
    news_view.style.display="none";
    sign_in_form.style.display="flex";
    error_div.style.display="none";
}

export function change_to_news_browsing_mode(sign_in_form,news_view,error_div){
    news_view.style.display="flex";
    sign_in_form.style.display="none";
    error_div.style.display="none";
}

function clear_log_in_inputs(username_input,password_input){
    username_input.value="";
    password_input.value="";
}

export function validate_user(username_input,password_input,sign_in_form,news_view,error_div){
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
            change_to_news_browsing_mode(sign_in_form,news_view,error_div);
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
    sign_in_label.innerHTML="Sing up";
    sign_in_button.value="Sing up";
    sign_up_div.style.display='none';
    error_div.style.display="none";
}

export function display_error_message(error_div,error_label){
    error_div.style.display="flex";
    error_label.innerHTML="Invalid login, please try again";
}