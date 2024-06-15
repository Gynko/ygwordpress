<?php function university_post_types()
{
    // Event post types
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

    // Program post types
    register_post_type("program", array(
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt"),
        "rewrite" => array("slug" => "programs"),
        "has_archive" => true,
        "public" => true,
        "show_in_rest" => true,
        "menu_icon" => "dashicons-awards",
        "labels" => array(
            "name" => "Programs",
            "add_new_item" => "Add new Program",
            "add_new" => "Add new Program",
            "edit_item" => "Edit Program",
            "all_items" => "All Programs",
            "singular_name" => "Program",
        )
    ));
}
add_action("init", "university_post_types");
