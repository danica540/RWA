import {is_valid_user,change_to_sign_up_mode,is_sign_in_mode,change_to_news_browsing_mode,default_view,display_error_message} from "./log-in-functions";

let error_div=document.getElementById("error-div");
let error_label=document.getElementById("error-message");
let news_view=document.getElementById("news_view");
let sign_in_form=document.getElementById("sign-in-form");
let username=document.getElementById("username");
let password=document.getElementById("password");
let sign_in_button=document.getElementById("sign-in-button");
let sign_up_link=document.getElementById("sign-up-link");
let sign_in_label=document.getElementById("sign-in-label");
let sign_up_div=document.getElementById("sign-up-div");

default_view(sign_in_form,news_view,error_div);

sign_in_button.onclick=(ev)=>{
  if(is_sign_in_mode(sign_in_button)){
    if(is_valid_user(username,password)){
      change_to_news_browsing_mode(sign_in_form,news_view,error_div);
    }
    else{
      display_error_message(error_div,error_label);
    }
  }
  else{
    console.log("Bla");
  }
  
}

sign_up_link.onclick=(ev)=>{
  change_to_sign_up_mode(sign_in_label,sign_in_button,sign_up_div,error_div);
}



