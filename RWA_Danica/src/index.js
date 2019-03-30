import {validateUser,change_to_sign_up_mode,is_sign_in_mode} from "./log-in-functions";

let username=document.getElementById("username");
let password=document.getElementById("password");
let sign_in_button=document.getElementById("sign-in-button");
let sign_up_link=document.getElementById("sign-up-link");
let sign_in_label=document.getElementById("sign-in-label");
let sign_up_div=document.getElementById("sign-up-div");

sign_in_button.onclick=(ev)=>{
  if(is_sign_in_mode(sign_in_button)){
    validateUser(username,password);
  }
  else{
    console.log("Bla");
  }
  
}

sign_up_link.onclick=(ev)=>{
  change_to_sign_up_mode(sign_in_label,sign_in_button,sign_up_div);
}



