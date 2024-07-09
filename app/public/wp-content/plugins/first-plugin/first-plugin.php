<?php 

/*
    Plugin Name: Our test plugin
    Description: This is our first attempt on writing a custom plugin in WordPress
    Version: 1.0
    Authos: Yoann
    Author URI: http://yoann.com
    
*/

add_filter("the_content", "addToEndOfPost");
function addToEndOfPost($content){
    if(is_single() && is_main_query()){
        return $content . '<p>My name is Yooann </p>';
    } 
        return $content;
}
