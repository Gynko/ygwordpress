<?php function university_post_types()
{
    register_post_type("event", array(
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt"),
        "rewrite" => array("slug" => "events"),
        "has_archive" => true,
        "public" => true,
        "show_in_rest" => true,
        "menu_icon" => "dashicons-calendar-alt",
        "labels" => array(
            "name" => "Events",
            "add_new_item" => "Add new Event",
            "add_new" => "Add new Event",
            "edit_item" => "Edit Event",
            "all_items" => "All Events",
            "singular_name" => "Event",
        )
    ));
}
add_action("init", "university_post_types");
