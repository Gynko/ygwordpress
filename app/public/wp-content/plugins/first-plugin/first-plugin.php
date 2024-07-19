<?php 

/*
    Plugin Name: Our test plugin
    Description: This is our first attempt on writing a custom plugin in WordPress
    Version: 1.0
    Authos: Yoann
    Author URI: http://yoann.com
    
*/

class WordCountAndTimePlugin{
    function __construct(){
        add_action('admin_menu', 'ourPluginSettingsMenu');
    }

    function ourPluginSettingsMenu(){
        add_options_page( 'Word count settings', 'Word count', "manage_options", 'word-count-settings', 'OurSettingsPageHTML');
}

    function OurSettingsPageHTML(){
        echo "<h1>Word count settings</h1>";
    }
}

$wordCountAndTimePlugin = new WordCountAndTimePlugin();