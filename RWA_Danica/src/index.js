import {validate_user,change_to_sign_up_mode,is_sign_in_mode,sign_in_view} from "./log-in-functions";
import {default_view} from "./default_page_functions";
import {interval, range, Observable,fromEvent} from "rxjs";
import {take,filter,map,scan} from "rxjs/operators";

let error_div=document.getElementById("error-div");
let news_view=document.getElementById("news_view");
let sign_in_form=document.getElementById("sign-in-form");
let username=document.getElementById("username");
let password=document.getElementById("password");
let sign_in_button=document.getElementById("sign-in-button");
let sign_up_link=document.getElementById("sign-up-link");
let sign_in_label=document.getElementById("sign-in-label");
let sign_up_div=document.getElementById("sign-up-div");
let sign_in_link=document.getElementById("sign-in-link");
let profile_link=document.getElementById("profile_link");
let profile_menu=document.getElementById("profile-menu");

default_view(sign_in_form,news_view,error_div,profile_link,profile_menu);

//sign_in_view(sign_in_form,news_view,error_div);

// data source is the click event on the button, it goes from the data source to the function we pass to the subscribe method, it's like date travels through a funnel

fromEvent(sign_in_button, 'click')
  .subscribe(() => {
    if(is_sign_in_mode(sign_in_button)){
      validate_user(username, password, sign_in_form, news_view, error_div, profile_link, sign_in_link, profile_menu);
    }
    else{
      console.log("Bla");
    }
});

fromEvent(sign_up_link, 'click')
  .subscribe(() => {
    change_to_sign_up_mode(sign_in_label,sign_in_button,sign_up_div,error_div);
});

fromEvent(sign_in_link, 'click')
  .subscribe(() => {
    sign_in_view(sign_in_form,news_view,error_div)
});





