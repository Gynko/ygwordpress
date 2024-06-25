<?php
function university_post_types()
{
    // Event post types
    register_post_type("event", array(
        "capability_type" => "event",
        "map_meta_cap" => true,
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt"),
        "rewrite" => array("slug" => "events"),
        "has_archive" => true,
        "public" => true,
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

    // Professor types
    register_post_type("professor", array(
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt", "thumbnail"),
        "rewrite" => array("slug" => "professors"),
        "has_archive" => true,
        "public" => true,
        "menu_icon" => "dashicons-welcome-learn-more",
        "labels" => array(
            "name" => "Professors",
            "add_new_item" => "Add new Professor",
            "add_new" => "Add new Professor",
            "edit_item" => "Edit Professor",
            "all_items" => "All Professors",
            "singular_name" => "Professor",
        )
    ));

    register_post_type("campus", array(
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt"),
        "rewrite" => array("slug" => "campuses"),
        "has_archive" => true,
        "public" => true,
        "menu_icon" => "dashicons-location-alt",
        "labels" => array(
            "name" => "Campuses",
            "add_new_item" => "Add new Campus",
            "add_new" => "Add new Campus",
            "edit_item" => "Edit Campus",
            "all_items" => "All Campuses",
            "singular_name" => "Campus",
        )
    ));

    register_post_type("note", array(
        "capability_type" => "note",
        "map_meta_cap" => true,
        "show_in_rest" => true,
        "supports" => array("title", "editor", "excerpt"),
        "public" => false,
        "show_ui" => true,
        "menu_icon" => "dashicons-welcome-write-blog",
        "labels" => array(
            "name" => "Notes",
            "add_new_item" => "Add new Note",
            "add_new" => "Add new Note",
            "edit_item" => "Edit Note",
            "all_items" => "All Notes",
            "singular_name" => "Note",
        )
    ));
}
add_action("init", "university_post_types");
