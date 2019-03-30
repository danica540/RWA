

function clear_log_in_inputs(username_input,password_input){
    username_input.value="";
    password_input.value="";
}

export function validateUser(username_input,password_input){
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
        if(user.length===0){
            alert("Korisnik ne postoji");
            clear_log_in_inputs(username_input,password_input);
        }
        else{
            clear_log_in_inputs(username_input,password_input);
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

export function change_to_sign_up_mode(sign_in_label,sign_in_button,sign_up_div){
    sign_in_label.innerHTML="Sing up";
    sign_in_button.value="Sing up";
    sign_up_div.style.display='none';
}