<?php 

/*
    Plugin Name: Our test plugin
    Description: This is our first attempt on writing a custom plugin in WordPress
    Version: 1.0
    Authos: Yoann
    Author URI: http://yoann.com
    
*/

add_action('admin_menu', 'ourPluginSettingsMenu');
function ourPluginSettingsMenu(){
        add_options_page( 'Test Plugin Page', 'Test Plugin', 'manage_options', 'test-plugin', 'test_init' );
}