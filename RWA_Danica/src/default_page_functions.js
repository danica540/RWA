import {hide_element,make_element_visible,change_text_in_an_element} from "./basic-functions";

export function default_view(sign_in_form,news_view,error_div,profile_link,profile_menu){
    make_element_visible(news_view);
    hide_element(sign_in_form);
    hide_element(error_div);
    hide_element(profile_link);
    hide_element(profile_menu);
}