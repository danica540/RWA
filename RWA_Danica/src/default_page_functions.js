import {hide_element,make_element_visible,change_text_in_an_element} from "./basic-functions";

export function default_view(sign_in_form,news_view,error_div,profile_link,profile_menu){
    make_element_visible(news_view);
    hide_element(sign_in_form);
    hide_element(error_div);
    hide_element(profile_link);
    hide_element(profile_menu);
}

export function news_list_view(news_list_div){
    fetch("http://localhost:3000/news")
    .then(res=>{
        if(!res.ok){
            throw Error(res.statusText);
        }
        else{
            return res.json();
        }
    })
    .then(news_list=>display_default_news_list(news_list_div,news_list))
    .catch(err=>console.log(err))
}


export function display_default_news_list(news_list_div,news_list){
    news_list.forEach(news => {
        draw(news_list_div,news);
    });
}

function draw_header(news_div,news){
    let headline=document.createElement("h2");
    headline.innerHTML=news.headline;
    news_div.appendChild(headline);
    let tag=document.createElement("label");
    tag.class="news-tag";
    tag.style.color="#4f758e";
    tag.innerHTML=news.tag;
    news_div.appendChild(tag);
}

function import_image_in_a_div(image_div,news){
    let br=document.createElement("br");
    image_div.appendChild(br);
    let image=document.createElement("img");
    image.src=news.img;
    image.className="news-image";
    image_div.appendChild(image);
}

function import_content_in_a_div(side_div,news){
    let content=document.createElement("p");
    content.innerHTML=news.content;
    side_div.appendChild(content);
}

function draw(news_list_div,news){
    let news_div=document.createElement("div");
    news_div.className="single-news-div";

    let image_div=document.createElement("div");
    image_div.className="image-div";

    let content_div=document.createElement("div");
    content_div.className="content-div";

    draw_header(content_div,news);
    import_content_in_a_div(content_div,news);

    import_image_in_a_div(image_div,news);

    news_div.appendChild(content_div);
    news_div.appendChild(image_div);
    
    news_list_div.appendChild(news_div);

}