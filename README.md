# My wordpress personal website <!-- omit in toc -->

# Table of content <!-- omit in toc -->

- [1. Purpose](#1-purpose)
- [2. Installation](#2-installation)
- [3. Learning](#3-learning)
  - [3.1. PHP](#31-php)
  - [3.2. Creating a new theme](#32-creating-a-new-theme)
  - [3.3. PHP functions](#33-php-functions)
  - [3.4. PHP arrays](#34-php-arrays)
  - [3.5. Introduction to Wordpress specific PHP](#35-introduction-to-wordpress-specific-php)
    - [3.5.1. Posts, post, pages](#351-posts-post-pages)
    - [3.5.2. Header and footer](#352-header-and-footer)
    - [3.5.3. Converting static HTML page to Wordpress](#353-converting-static-html-page-to-wordpress)
    - [3.5.4. Interior page template](#354-interior-page-template)
    - [3.5.5. Parent and children pages](#355-parent-and-children-pages)
    - [3.5.6. Menu of children page links](#356-menu-of-children-page-links)
    - [3.5.7. Extra head tips](#357-extra-head-tips)
    - [3.5.8. Navigation menus](#358-navigation-menus)
    - [3.5.9. Building the blog section](#359-building-the-blog-section)
    - [3.5.10. Pagination](#3510-pagination)
    - [3.5.11. Blog archives](#3511-blog-archives)
    - [3.5.12. The almighty Custom queries](#3512-the-almighty-custom-queries)
    - [3.5.13. Posts types : events](#3513-posts-types--events)
    - [3.5.14. Misc updates](#3514-misc-updates)
    - [3.5.15. Custom fields](#3515-custom-fields)
    - [3.5.16. Manipulating default url based queries](#3516-manipulating-default-url-based-queries)
    - [3.5.17. Pasts events - custom query pagination](#3517-pasts-events---custom-query-pagination)
    - [3.5.18. The program posts types - relationships between content posts](#3518-the-program-posts-types---relationships-between-content-posts)
    - [3.5.19. Create new post type: professors](#3519-create-new-post-type-professors)
    - [3.5.20. Adding picture of the professor](#3520-adding-picture-of-the-professor)
    - [3.5.21. Cropping](#3521-cropping)
    - [3.5.22. Page banner dynamic bg image - and reusable code](#3522-page-banner-dynamic-bg-image---and-reusable-code)
    - [3.5.23. Get template part](#3523-get-template-part)
    - [3.5.24. Create a function vs get_template_part?](#3524-create-a-function-vs-get_template_part)
    - [3.5.25. Getting ready for Javascript](#3525-getting-ready-for-javascript)
    - [3.5.26. Campuses](#3526-campuses)
    - [3.5.27. Live search](#3527-live-search)
    - [3.5.28. Load WP content with JS](#3528-load-wp-content-with-js)
    - [3.5.29. Searching through posts, events, anything](#3529-searching-through-posts-events-anything)
    - [3.5.30. Search - Add Custom fields to data](#3530-search---add-custom-fields-to-data)
    - [3.5.31. Create a custom endpoint for search](#3531-create-a-custom-endpoint-for-search)
    - [3.5.32. The raw data](#3532-the-raw-data)
    - [3.5.33. Using the new endpoint from the frontend](#3533-using-the-new-endpoint-from-the-frontend)
    - [3.5.34. A search that includes relationships](#3534-a-search-that-includes-relationships)
    - [3.5.35. User roles and permissions: wordpress default](#3535-user-roles-and-permissions-wordpress-default)
    - [3.5.36. Custom role](#3536-custom-role)
    - [3.5.37. Open registration](#3537-open-registration)
    - [3.5.38. The login](#3538-the-login)
    - [3.5.39. User generated content](#3539-user-generated-content)
    - [3.5.40. Permissions](#3540-permissions)
    - [3.5.41. Security: the notes and escape functions](#3541-security-the-notes-and-escape-functions)
      - [3.5.41.1. Escape Attribute:](#35411-escape-attribute)
      - [3.5.41.2. Escape textarea](#35412-escape-textarea)
    - [3.5.42. Even more secure: html in the notes](#3542-even-more-secure-html-in-the-notes)
    - [3.5.43. Per user post limit](#3543-per-user-post-limit)
    - [3.5.44. Final code without jquery](#3544-final-code-without-jquery)
    - [3.5.45. Let user like or heart a professor](#3545-let-user-like-or-heart-a-professor)
    - [3.5.46. Creating custom POST and DELETE endpoints](#3546-creating-custom-post-and-delete-endpoints)
    - [3.5.47. Enforce limit of one like per user/teacher - being logged in - permissions](#3547-enforce-limit-of-one-like-per-userteacher---being-logged-in---permissions)
- [4. Wordpress plugins development](#4-wordpress-plugins-development)
  - [4.1. Base setup](#41-base-setup)
  - [4.2. Adding settings page](#42-adding-settings-page)

# 1. Purpose

This is my personal website.

I made it to learn myself Wordpress, and at the same time to a cool company in Tønsberg.

# 2. Installation

1. Installing Local

# 3. Learning

## 3.1. PHP

PHP is executed on the server.

```php
<?php
    echo 2 + 2;
    $myname = "Yoann";
?>
<h1>Hellooo <?php echo $myname ?></h1>
<?php
echo 5*5
?>
<p>Not bad, <?php echo $myname ?></p>
```

## 3.2. Creating a new theme

1. Create new folder in wp-content / themes
2. Folder name
3. 3 files: index.php, style.css, screenshot.png
4. Activate the theme

## 3.3. PHP functions

```php
<?php
    function greet ($name, $color) {
        echo "<p>My name is $name and my favourite color is $color</p>";
    }
    greet("Ingvild", "green");
    greet("Nils", "blue");
?>
```

Wordpress comes with its own set of functions, for example:

```php
<h1><?php bloginfo("name"); ?></h1>
<p><?php bloginfo("description");?></p>
```

## 3.4. PHP arrays

```php
<?php
    $names = array("yoann", "Nils", "Ingvild");
    $count = 0;
    while ($count <= 2){
        echo "<li>my name is $names[$count]</li>";
        $count++;
    }
?>
```

## 3.5. Introduction to Wordpress specific PHP

### 3.5.1. Posts, post, pages

Here we get a hold of the posts and show the title and content.
We make the title be a link so that the posts get their own single page.

```php
<?php
    while(have_posts()){
        the_post(); ?>
        <h2><a href="<?php the_permalink() ?>"><?php the_title()?></a></h2>
        <p><?php the_content()?></p>
        <hr>
        <?php
    }
?>
```

But for the single page we need to create a file called single.php, and we can custom by for example removing the a tag

```php
<?php
    while(have_posts()){
        the_post(); ?>
        <h2><?php the_title()?></h2>
        <p><?php the_content()?></p>
        <?php
    }
?>
```

If we create a new page, we notice that the new page seem to be powered by the index.php template. But we can add a page.php

```php
<?php
    while(have_posts()){
        the_post(); ?>
        <h1>This is a page</h1>
        <h2><?php the_title()?></h2>
        <p><?php the_content()?></p>
        <?php
    }
?>
```

### 3.5.2. Header and footer

We create a header.php and footer.php.

header

```php
<!DOCTYPE html>
<head>
    <?php wp_head(); ?>
</head>
<body>
    <<h1>YoyO</h1>>
```

functions.php

```php
<?php
    function yoanngodiet_files(){
        wp_enqueue_style("main_styles", get_stylesheet_uri());
    };
    add_action("wp_enqueue_scripts", "yoanngodiet_files");
?>
```

footer.php

```php
<h1>Greetings from footer.php</h1>
<?php wp_footer(); ?>
</body>
</html>
```

### 3.5.3. Converting static HTML page to Wordpress

```php
<head>
    <?php wp_head(); ?>
</head>


<?php
    function yoanngodiet_files(){
        wp_enqueue_script("main_yoann", get_theme_file_uri("/build/index.js"), array("jquery"), "1.0", true);
        wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
        wp_enqueue_style("font_awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
        wp_enqueue_style("main_styles", get_theme_file_uri("/build/style-index.css"));
        wp_enqueue_style("extra_styles", get_theme_file_uri("/build/index.css"));
    };
    function university_features() {
        add_theme_support("title-tag");
    }
    add_action("wp_enqueue_scripts", "yoanngodiet_files");
    add_action("after_setup_theme", "university_features");
?>

<li><a href="<?php echo site_url("/privacy-policy") ?>">Privacy</a></li>
```

### 3.5.4. Interior page template

### 3.5.5. Parent and children pages

Create new page - page attributes - parent.
Conditional if the page has a parent page.

```php
    <?php
    $theParent = wp_get_post_parent_id(get_the_ID());
        if ($theParent) { ?>
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
            <a class="metabox__blog-home-link" href="<?php the_permalink($theParent) ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent)?></a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>
        <?php
        }
    ?>
```

### 3.5.6. Menu of children page links

We need an associative array

```php
&animalSounds = array(
    "car" => "meow",
    "dog" => "bark"
    );
    echo $animalSounds["dog"];
```

```php
<div class="container container--narrow page-section">
    <?php
    $theParent = wp_get_post_parent_id(get_the_ID());
    if ($theParent) { ?>
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php the_permalink($theParent) ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent) ?></a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>
    <?php
    }
    ?>
    <?php
    $testArray = get_pages(array(
        "child_of" => get_the_ID()
    ));
    if ($theParent or $testArray) { ?>
        <div class="page-links">
            <h2 class="page-links__title"><a href="<?php echo the_permalink($theParent) ?>"><?php echo get_the_title($theParent) ?></a></h2>
            <ul class="min-list">
                <?php
                if ($theParent) {
                    $findChildrenOf = $theParent;
                } else {
                    $findChildrenOf = get_the_ID();
                }
                wp_list_pages(array(
                    "title_li" => NULL,
                    "child_of" =>  $findChildrenOf
                ));
                ?>
            </ul>
        </div>
    <?php } ?>
    <div class="generic-content">
        <?php the_content() ?>
    </div>
</div>
```

### 3.5.7. Extra head tips

Many new classes

```php
<!DOCTYPE html>
<html <?php language_attributes() ?>>

<head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
    <header class="site-header">
        <div class="container">
            <h1 class="school-logo-text float-left">
                <a href="<?php echo site_url() ?>"><strong>Yoann</strong> Godiet</a>
            </h1>
            <span class="js-search-trigger site-header__search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
            <i class="site-header__menu-trigger fa fa-bars" aria-hidden="true"></i>
            <div class="site-header__menu group">
                <nav class="main-navigation">
                    <ul>
                        <li><a href="<?php echo site_url("/about-me") ?>">About me</a></li>
                        <li><a href="#">Programs</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Campuses</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </nav>
                <div class="site-header__util">
                    <a href="#" class="btn btn--small btn--orange float-left push-right">Login</a>
                    <a href="#" class="btn btn--small btn--dark-orange float-left">Sign Up</a>
                    <span class="search-trigger js-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>
    </header>
```

### 3.5.8. Navigation menus

We need to add the menu.

```php
<?php
<?php
function yoanngodiet_files()
{
    wp_enqueue_script("main_yoann", get_theme_file_uri("/build/index.js"), array("jquery"), "1.0", true);
    wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font_awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_style("main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("extra_styles", get_theme_file_uri("/build/index.css"));
};
function university_features()
{
    register_nav_menu("headerMenuLocation", "Header Menu Location");
    register_nav_menu("footerMenuLocationOne", "Footer Menu Location One");
    register_nav_menu("footerMenuLocationTwo", "Footer Menu Location Two");
    add_theme_support("title-tag");
}
add_action("wp_enqueue_scripts", "yoanngodiet_files");
add_action("after_setup_theme", "university_features");


```

Also thick Display location

```php
<nav class="main-navigation">
    <?php
    wp_nav_menu(array(
        "theme_location" => "headerMenuLocation"
    ))
    ?>
</nav>
```

```php
      <div class="site-footer__col-two-three-group">
        <div class="site-footer__col-two">
          <h3 class="headline headline--small">Explore</h3>
          <nav class="nav-list">
            <ul>
              <?php
              wp_nav_menu(array(
                "theme_location" => "footerMenuLocationOne"
              ))
              ?>
              <!--               <li><a href="<?php echo site_url("/about-me") ?>">About me</a></li>
              <li><a href="#">Programs</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Campuses</a></li> -->
            </ul>
          </nav>
        </div>

        <div class="site-footer__col-three">
          <h3 class="headline headline--small">Learn</h3>
          <nav class="nav-list">
            <ul>
              <?php
              wp_nav_menu(array(
                "theme_location" => "footerMenuLocationTwo"
              ))
              ?>
              <!--               <li><a href="#">Legal</a></li>
              <li><a href="<?php echo site_url("/privacy-policy") ?>">Privacy</a></li>
              <li><a href="#">Careers</a></li> -->
            </ul>
          </nav>
        </div>
      </div>
```

Importantly, wordpress creates new classes along, that can be targeted in CSS

If we don't have these new classes

### 3.5.9. Building the blog section

2 new pages: Home and Blog

Now in settings / reading, we can set a HomePage and a Posts Page

Then a front-page.php

Here the index.php for blog

```php
<?php
get_header();
?>
<div class="page-banner">
  <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
  <div class="page-banner__content container container--narrow">
    <h1 class="page-banner__title">Welcome to our blog</h1>
    <div class="page-banner__intro">
      <p>Keep up with our latest news</p>
    </div>
  </div>
</div>
<div class="container container--narrow page-section">
  <?php
  while (have_posts()) {
    the_post(); ?>
    <div class="post-item">
      <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
      <div class="metabox">
        <p>Posted by <?php the_author_posts_link() ?> on <?php the_time("F j, Y") ?> in <?php echo get_the_category_list(", ") ?></p>
      </div>

      <div class="generic-content">
        <?php the_excerpt() ?>
        <a class="btn btn--blue" href="<?php the_permalink() ?>">Continue reading</a>
      </div>
    </div>
  <?php
  }
  ?>
</div>
<?php
get_footer();
?>
```

### 3.5.10. Pagination

Default is 10. Settings, reading.

```php
  echo paginate_links();
```

### 3.5.11. Blog archives

When clicking on a category or an author, we will get to an category archive, or author archive.

```php
<?php
get_header();
?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php the_archive_title();?></h1>
        <div class="page-banner__intro">
            <p>Keep up with our latest news</p>
        </div>
    </div>
</div>
```

Date archives - Exhausting with if statements

```php
<?php
get_header();
?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php the_archive_title() ?></h1>
        <div class="page-banner__intro">
            <p>Keep up with our latest news</p>
        </div>
    </div>
</div>
```

Adding description.
For author, this is set by biographical info.
For category it is the Posts/categories/Description

```php
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php the_archive_title() ?></h1>
        <div class="page-banner__intro">
            <p><?php the_archive_description() ?></p>
        </div>
    </div>
</div>
```

### 3.5.12. The almighty Custom queries

They allow us to get the content we want, wherever we want.

Note the wp_reset_postdata();

```php
<?php
$homepagePosts = new WP_Query(array(
    "posts_per_page" => 2
));

while ($homepagePosts->have_posts()) {
    $homepagePosts->the_post(); ?>
    <div class="event-summary">
        <a href="<?php the_permalink() ?>" class="event-summary__date event-summary__date--beige t-center" href="#">
            <span class="event-summary__month"><?php the_time("M") ?></span>
            <span class="event-summary__day"><?php the_time("d") ?></span>
        </a>
        <div class="event-summary__content">
            <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
            <p><?php echo wp_trim_words(get_the_content(), "18") ?><a href="<?php the_permalink() ?>" class="nu gray">Read more</a></p>
        </div>
    </div>
<?php wp_reset_postdata();
}
?>
```

### 3.5.13. Posts types : events

By default there are 2 post types: posts and pages

```bash
http://yoanngodiet.local/wp-admin/edit.php?post_type=page
```

We want to create Events, Programs, Professors

https://developer.wordpress.org/resource/dashicons/#businessperson

Need to make it a Must Use Plugin. Create mu-plugins folder in wp-content.

```php
<?php function university_post_types()
{
    register_post_type("event", array(
        "public" => true,
        "show_in_rest" => true,
        "menu_icon" => "dashicons-calendar-alt",
        "labels" => array(
            "name" => "Events",
            "add_new_item" => "Add new Event",
            "add_new" => "Add new Event",
            "edit_item" => "Edit Event",
            "all_items" => "All Events",
            "singular_name" => "Event"
        )
    ));
}
add_action("init", "university_post_types");
```

https://developer.wordpress.org/reference/functions/register_post_type/

https://developer.wordpress.org/reference/functions/get_post_type_labels/

To display them, we use wp query - for permalinks we need to go to settings / permalinks and set to day and name

```php
<div class="full-width-split__one">
    <div class="full-width-split__inner">
        <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>
        <?php
        $homepageEvents = new WP_Query(array(
            "posts_per_page" => 2,
            "post_type" => "event"
        ));

        while ($homepageEvents->have_posts()) {
            $homepageEvents->the_post(); ?>
            <div class="event-summary">
                <a class="event-summary__date t-center" href="#">
                    <span class="event-summary__month"><?php the_time("M"); ?></span>
                    <span class="event-summary__day"><?php the_time("d"); ?></span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h5>
                    <p>
                        <?php echo wp_trim_words(get_the_content(), 18); ?>
                        <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a>
                    </p>
                </div>
            </div>
        <?php }
        wp_reset_postdata();
        ?>
        <p class="t-center no-margin">
            <a href="#" class="btn btn--blue">View All Events</a>
        </p>
    </div>
</div>
```

Then we create the single-event.php

And update to have archives - you will need to flush permalinks - go to settings/permalinks/save changes.

```php
<?php function university_post_types()
{
    register_post_type("event", array(
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
```

To change the theme, create archive-event.php

```php
<?php
get_header();
?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php the_archive_title() ?></h1>
        <div class="page-banner__intro">
            <p> See what is going on in our world</p>
        </div>
    </div>
</div>
<div class="container container--narrow page-section">
    <?php
    while (have_posts()) {
        the_post(); ?>
        <div class="event-summary">
            <a class="event-summary__date t-center" href="#">
                <span class="event-summary__month"><?php the_time("M"); ?></span>
                <span class="event-summary__day"><?php the_time("d"); ?></span>
            </a>
            <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h5>
                <p>
                    <?php echo wp_trim_words(get_the_content(), 18); ?>
                    <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a>
                </p>
            </div>
        </div>
    <?php
    }
    echo paginate_links();
    ?>

</div>
<?php
get_footer();
?>
```

### 3.5.14. Misc updates

Excerpts: you may want handcrafted excerpts

```php
<?php
$homepagePosts = new WP_Query(array(
    "posts_per_page" => 2
));

while ($homepagePosts->have_posts()) {
    $homepagePosts->the_post(); ?>
    <div class="event-summary">
        <a href="<?php the_permalink() ?>" class="event-summary__date event-summary__date--beige t-center" href="#">
            <span class="event-summary__month"><?php the_time("M") ?></span>
            <span class="event-summary__day"><?php the_time("d") ?></span>
        </a>
        <div class="event-summary__content">
            <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
            <p><?php if (has_excerpt()) {
                    echo get_the_excerpt();
                } else {
                    echo wp_trim_words(get_the_content(), "18");
                } ?><a href="<?php the_permalink() ?>" class="nu gray">Read more</a></p>
        </div>
    </div>
<?php wp_reset_postdata();
}
?>
```

### 3.5.15. Custom fields

```php
"supports" => array("title", "editor", "excerpt", "custom-fields"),
```

then 3 dots, preferences, custom fields.

2 main plugins:

1. ACF
2. CMB2

Add plugin
Add field group
Event_date
Location rule

```php
<a class="event-summary__date t-center" href="#">
    <span class="event-summary__month"><?php
        $eventDate = new DateTime(get_field("event_date"));
        echo $eventDate->format("M");
        ?></span>
    <span class="event-summary__day"><?php
        echo $eventDate->format("d");
        ?></span>
</a>
```

sorting

```php
$homepageEvents = new WP_Query(array(
    "posts_per_page" => 2,
    "post_type" => "event",
    "orderby" => "meta_value_num",
    "meta_key" => "event_date",
    "order" => "ASC"
));
```

Removing past, we need meta query

```php
<?php
$today = date("Ymd");
$homepageEvents = new WP_Query(array(
    "posts_per_page" => 2,
    "post_type" => "event",
    "orderby" => "meta_value_num",
    "meta_key" => "event_date",
    "order" => "ASC",
    "meta_query" => array(
        array(
            "key" => "event_date",
            "compare" => ">=",
            "value" => $today,
            "type" => "numeric"
        )
    )
));
```

### 3.5.16. Manipulating default url based queries

For the archive events page, to sort them:

```php
function adjust_queries($query)
{
    $today = date("Ymd");
    if (!is_admin() and is_post_type_archive("event") and $query->is_main_query()) {
        $query->set("meta_key", "event_date");
        $query->set("orderby", "meta_value_num");
        $query->set("order", "ASC");
        $query->set("meta_query", array(
            array(
                "key" => "event_date",
                "compare" => ">=",
                "value" => $today,
                "type" => "numeric"
            )
        ));
    }
}
add_action("pre_get_posts", "adjust_queries");
```

### 3.5.17. Pasts events - custom query pagination

New page in admin. Then page-past-events.php

Pagination will work only with default queries that are tied to the url, so have to do this.

```php
<?php
get_header();
?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title">Past Events</h1>
        <div class="page-banner__intro">
            <p>A recap of our past events</p>
        </div>
    </div>
</div>
<div class="container container--narrow page-section">
    <?php
    $today = date("Ymd");
    $pastEvents = new WP_Query(array(
        "paged" => get_query_var("paged", 1),
        "posts_per_page" => "2",
        "post_type" => "event",
        "orderby" => "meta_value_num",
        "meta_key" => "event_date",
        "order" => "ASC",
        "meta_query" => array(
            array(
                "key" => "event_date",
                "compare" => "<",
                "value" => $today,
                "type" => "numeric"
            )
        )
    ));


    while ($pastEvents->have_posts()) {
        $pastEvents->the_post(); ?>
        <div class="event-summary">
            <a class="event-summary__date t-center" href="#">
                <span class="event-summary__month"><?php
                                                    $eventDate = new DateTime(get_field("event_date"));
                                                    echo $eventDate->format("M");
                                                    ?></span>
                <span class="event-summary__day"><?php
                                                    echo $eventDate->format("d");
                                                    ?></span>
            </a>
            <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h5>
                <p>
                    <?php echo wp_trim_words(get_the_content(), 18); ?>
                    <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a>
                </p>
            </div>
        </div>
    <?php
    }
    echo paginate_links(array(
        "total" => $pastEvents->max_num_pages
    ));
    ?>

</div>
<?php
get_footer();
?>
```

### 3.5.18. The program posts types - relationships between content posts

1. Update the mu-plugins
2. Settings / permalinks / save changes
3. We created a new Relationship with ACF, if post type is equal to event

```php
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
        "rewrite" => array("slug" => "events"),
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
```

### 3.5.19. Create new post type: professors

1. Go to mu_plugin

```php
register_post_type("professor", array(
    "show_in_rest" => true,
    "supports" => array("title", "editor", "excerpt"),
    "public" => true,
    "show_in_rest" => true,
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
```

2. Create some entries, update permalinks
3. single-professor.php
4. Create a relationship with programs, adding it in the rules of the Post_Type
5. Create our custom query - note the importance of wp_reset_postdata();

### 3.5.20. Adding picture of the professor

1. Not adding an image block. We added before featured image / post thumbnails. Not there by default
2. In functions .php:

```php
function university_features()
{
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
}
```

3. It is now enabled for blog-posts, but not for custom-posts
4. go to mu_plugins

```php
register_post_type("professor", array(
    "show_in_rest" => true,
    "supports" => array("title", "editor", "excerpt", "thumbnail")
)
);
```

5. Wordpress creates automatically different size for the images that we upload - And we can ask wordpress to generate additional ones. In function.php:

```php
function university_features()
{
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    add_image_size("professorLandscape", 400, 260, true);
    add_image_size("professorPortrait", 480, 650, true);
}
```

6. Not retroactive - a plugin can do this: "Regenerate thumbnails" and activate
7. Tools > Regenerate thumbnails

### 3.5.21. Cropping

By default, wordpress cuts from the middle, but we can have more control with plugin called

### 3.5.22. Page banner dynamic bg image - and reusable code

We cannot use the featured image. Would not work for the professor type because we can only have one featured image.

We need a custom field that allow this, with ACF.

Then a new image size.

```php
function university_features()
{
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    add_image_size("professorLandscape", 400, 260, true);
    add_image_size("professorPortrait", 480, 650, true);
    add_image_size("pageBanner", 1500, 350, true);
}

<?php the_post_thumbnail("professorPortrait") ?>
```

### 3.5.23. Get template part

we create a new folder - template-parts, and a event.php with the code that repeats

```php
<div class="event-summary">
    <a class="event-summary__date t-center" href="#">
        <span class="event-summary__month"><?php
                                            $eventDate = new DateTime(get_field("event_date"));
                                            echo $eventDate->format("M");
                                            ?></span>
        <span class="event-summary__day"><?php
                                            echo $eventDate->format("d");
                                            ?></span>
    </a>
    <div class="event-summary__content">
        <h5 class="event-summary__title headline headline--tiny">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h5>
        <p>
            <?php if (has_excerpt()) {
                echo get_the_excerpt();
            } else {
                echo wp_trim_words(get_the_content(), "18");
            } ?>
            <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a>
        </p>
    </div>
</div>
```

and then

```php
while ($homepageEvents->have_posts()) {
    $homepageEvents->the_post();
    get_template_part("template-parts/event");
}
wp_reset_postdata();
?>
```

Specialty name = second argument which allows dynamicity.

```php
get_template_part("template-parts/content", get_post_type());
```

So now in our folder template-parts, we name our file content-event and content-professors, with different content.

### 3.5.24. Create a function vs get_template_part?

If i want the duplicate code to be dynamic - we create a function. If duplicate code is static, we just get_template.

### 3.5.25. Getting ready for Javascript

1. nodejs
2. move package.json in folder
3. npm install
4. npm run start
5. npm run build: take all source code and bundles

### 3.5.26. Campuses

```php
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
```

then some posts

then ACF:

1. Map Location
2. Type: Google Map field type
3. required
4. location post type campus

Then we need an API key from Google

1. console developers google
2. new project
3. api - places api

### 3.5.27. Live search

1. Create a new file in modules

### 3.5.28. Load WP content with JS

```bash
/wp-json/wp/v2/posts
/wp-json/wp/v2/pages
/wp-json/wp/v2/posts?search="bananas"
```

https://developer.wordpress.org/rest-api/

```js
class Search {
  constructor() {
    this.openButton = document.querySelector(".js-search-trigger");
    this.closeButton = document.querySelector(".search-overlay__close");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchField = document.querySelector("#search-term");
    this.resultsDiv = document.querySelector("#search-overlay__results");
    this.events();
    this.isOverlayOpened = false;
    this.isSpinnerVisible = false;
    this.typingTimer;
    this.previousValue = "";
  }

  events() {
    this.openButton.addEventListener("click", this.openOverlay.bind(this));
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
    document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
  }

  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
    document.body.classList.add("body-no-scroll");
    this.isOverlayOpened = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove("body-no-scroll");
    this.isOverlayOpened = false;
  }

  keyPressDispatcher(event) {
    if (event.key === "Escape" && this.isOverlayOpened) {
      this.closeOverlay();
    } else if (
      (event.key === "s" || event.key === "S") &&
      !this.isOverlayOpened
    ) {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName !== "INPUT" &&
        activeElement.tagName !== "TEXTAREA"
      ) {
        this.openOverlay();
      }
    }
  }

  typingLogic() {
    if (this.searchField.value !== this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.value !== "") {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = `<div class="spinner-loader"></div>`;
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 1000);
      } else {
        this.resultsDiv.innerHTML = "";
        this.isSpinnerVisible = false;
      }
      this.previousValue = this.searchField.value;
    }
  }

  getResults() {
    fetch(
      universityData.root_url +
        "/wp-json/wp/v2/posts?search=" +
        this.searchField.value
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((posts) => {
        if (posts.length > 0) {
          this.resultsDiv.innerHTML = posts
            .map(
              (post) => `
                        <div class="post" style="background-color:pink">
                            <h1>${post.title.rendered}</h1>
                            <p>${post.content.rendered}</p>
                            <a href="${post.link}">${post.title.rendered}</a>
                        </div>
                    `
            )
            .join("");
          this.isSpinnerVisible = false;
        } else {
          this.resultsDiv.innerHTML = "no matches found.";
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

export default Search;
```

```php
function yoanngodiet_files()
{
    wp_enqueue_script("main_yoann", get_theme_file_uri("/build/index.js"), array("jquery"), "1.0", true);
    wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font_awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_style("main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("extra_styles", get_theme_file_uri("/build/index.css"));

    wp_localize_script("main_yoann", "universityData", array(
        "root_url" => get_site_url()
    ));
}
add_action("wp_enqueue_scripts", "yoanngodiet_files");
```

### 3.5.29. Searching through posts, events, anything

```js
    async getResults() {
        const postTypes = ["posts", "pages"];
        const searchQuery = this.searchField.value;
        const results = [];

        for (const type of postTypes) {
          try {
            const response = await fetch(
              `${universityData.root_url}/wp-json/wp/v2/${type}?search=${searchQuery}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            const posts = await response.json();
            results.push({ type, posts });
          } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
          }
        }

        if (results.length > 0) {
          this.resultsDiv.innerHTML = results
            .map(
              (result) => `
                <h1 style="background-color:yellow">${result.type.charAt(0).toUpperCase() + result.type.slice(1)}</h1>
                ${result.posts
                  .map(
                    (post) => `
                      <div class="post" style="background-color:pink">
                        <h2>${post.title.rendered}</h2>
                        <p>${post.content.rendered}</p>
                        <a href="${post.link}">${post.title.rendered}</a>
                      </div>
                    `
                  )
                  .join('')}
              `
            )
            .join('');
        } else {
          this.resultsDiv.innerHTML = "no matches found.";
        }

        this.isSpinnerVisible = false;
      }
```

### 3.5.30. Search - Add Custom fields to data

By default, when we visit the page /post, we get the 10 first posts. But what if it is not what we want and would like to have an additional custom field?

```php
function university_custom_rest()
{
    register_rest_field("post", "authorName", array(
        "get_callback" => function () {
            return get_the_author();
        },
    ));
};
add_action("rest_api_init", "university_custom_rest");
```

### 3.5.31. Create a custom endpoint for search

Why?

There are all kinds of builtin urls that will let you fetch about just any data you may be looking for.

```php
"show_in_rest" => true,
```

So for example in our search, we would like to have an endpoint that can show posts, events, professors in one strike.

Benefit:

1. We can have custom search logic
2. Respond with less JSON data (loads faster)
3. Send only 1 http request instead of 6

Process:

1. Create a helpers function folder
2. Require it in functions.php: require get_theme_file_path("/helpers/search-route.php");

register_rest_route:

First argument is the namespace. If we look at the API url for a given posttype, the namespace of the url is wp, which indicates that it is part of the default part of the core of wordpress - which we dont want to use

```bash
http://yoanngodiet.local/wp-json/wp/v2/professor
```

```php
<?php
function universityRegisterSearch()
{
    register_rest_route("university/v1", "search", array(
        "methods" => WP_REST_Server::READABLE,
        "callback" => "universitySearchResults"
    ));
}
add_action("rest_api_init", "universityRegisterSearch");

function universitySearchResults()
{
    return "congratulations";
};

```

### 3.5.32. The raw data

```php
<?php

function universityRegisterSearch()
{
    register_rest_route("university/v1", "search", array(
        "methods" => WP_REST_Server::READABLE,
        "callback" => "universitySearchResults"
    ));
}
add_action("rest_api_init", "universityRegisterSearch");

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        "post_type" => array("post", "page", "professor", "program", "event"),
        "s" => sanitize_text_field($data["term"])
    ));

    $results = array(
        "generalInfo" => array(),
        "professors" => array(),
        "programs" => array(),
        "events" => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        if (get_post_type() == "post" or get_post_type() == "page") {
            array_push($results["generalInfo"], array(
                "title" => get_the_title(),
                "permalink" => get_the_permalink()
            ));
        }
        if (get_post_type() == "professor") {
            array_push($results["professors"], array(
                "title" => get_the_title(),
                "permalink" => get_the_permalink()
            ));
        }
        if (get_post_type() == "program") {
            array_push($results["programs"], array(
                "title" => get_the_title(),
                "permalink" => get_the_permalink()
            ));
        }
        if (get_post_type() == "event") {
            array_push($results["events"], array(
                "title" => get_the_title(),
                "permalink" => get_the_permalink()
            ));
        }
    }
    return $results;
};
```

### 3.5.33. Using the new endpoint from the frontend

Back in our Search.js

```js
class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML();
    this.resultsDiv = document.getElementById("search-overlay__results");
    this.openButtons = document.querySelectorAll(".js-search-trigger");
    this.closeButton = document.querySelector(".search-overlay__close");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchField = document.getElementById("search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue = "";
    this.typingTimer = null;
  }

  // 2. events
  events() {
    this.openButtons.forEach((button) =>
      button.addEventListener("click", this.openOverlay.bind(this))
    );
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
    document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
  }

  // 3. methods (function, action...)
  typingLogic() {
    if (this.searchField.value !== this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.value) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.innerHTML = "";
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchField.value;
  }

  getResults() {
    fetch(
      `${universityData.root_url}/wp-json/university/v1/search?term=${this.searchField.value}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((results) => {
        results.generalInfo = results.generalInfo || [];
        results.professors = results.professors || [];
        results.programs = results.programs || [];
        results.campuses = results.campuses || [];
        results.events = results.events || [];

        this.resultsDiv.innerHTML = `
            <div class="row">
              <div class="one-third">
                <h2 class="search-overlay__section-title">General Information</h2>
                ${
                  results.generalInfo.length
                    ? '<ul class="link-list min-list">'
                    : "<p>No general information matches that search.</p>"
                }
                  ${results.generalInfo
                    .map(
                      (item) =>
                        `<li><a href="${item.permalink}">${item.title}</a> ${
                          item.postType === "post"
                            ? `by ${item.authorName}`
                            : ""
                        }</li>`
                    )
                    .join("")}
                ${results.generalInfo.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Programs</h2>
                ${
                  results.programs.length
                    ? '<ul class="link-list min-list">'
                    : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
                }
                  ${results.programs
                    .map(
                      (item) =>
                        `<li><a href="${item.permalink}">${item.title}</a></li>`
                    )
                    .join("")}
                ${results.programs.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Professors</h2>
                ${
                  results.professors.length
                    ? '<ul class="professor-cards">'
                    : `<p>No professors match that search.</p>`
                }
                  ${results.professors
                    .map(
                      (item) => `
                    <li class="professor-card__list-item">
                      <a class="professor-card" href="${item.permalink}">
                        <img class="professor-card__image" src="${item.image}">
                        <span class="professor-card__name">${item.title}</span>
                      </a>
                    </li>
                  `
                    )
                    .join("")}
                ${results.professors.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Campuses</h2>
                ${
                  results.campuses.length
                    ? '<ul class="link-list min-list">'
                    : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`
                }
                  ${results.campuses
                    .map(
                      (item) =>
                        `<li><a href="${item.permalink}">${item.title}</a></li>`
                    )
                    .join("")}
                ${results.campuses.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Events</h2>
                ${
                  results.events.length
                    ? ""
                    : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`
                }
                  ${results.events
                    .map(
                      (item) => `
                    <div class="event-summary">
                      <a class="event-summary__date t-center" href="${item.permalink}">
                        <span class="event-summary__month">${item.month}</span>
                        <span class="event-summary__day">${item.day}</span>  
                      </a>
                      <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                        <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                      </div>
                    </div>
                  `
                    )
                    .join("")}
              </div>
            </div>
          `;
        this.isSpinnerVisible = false;
      })
      .catch((error) => console.error("Error fetching results:", error));
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode === 83 &&
      !this.isOverlayOpen &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
      this.openOverlay();
    }

    if (e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
    document.body.classList.add("body-no-scroll");
    this.searchField.value = "";
    setTimeout(() => this.searchField.focus(), 301);
    console.log("Our open method just ran!");
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove("body-no-scroll");
    console.log("Our close method just ran!");
    this.isOverlayOpen = false;
  }

  addSearchHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="search-overlay">
          <div class="search-overlay__top">
            <div class="container">
              <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
              <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
              <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
          </div>
          <div class="container">
            <div id="search-overlay__results"></div>
          </div>
        </div>
      `
    );
  }
}

export default Search;
```

and search-route.php

```php
<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();

        if (get_post_type() == 'post' or get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'postType' => get_post_type(),
                'authorName' => get_the_author()
            ));
        }

        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
        }

        if (get_post_type() == 'program') {
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (has_excerpt()) {
                $description = get_the_excerpt();
            } else {
                $description = wp_trim_words(get_the_content(), 18);
            }

            array_push($results['events'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate->format('M'),
                'day' => $eventDate->format('d'),
                'description' => $description
            ));
        }
    }

    return $results;
}

```

### 3.5.34. A search that includes relationships

If we are searching for biology, we would love the search results to show the professors of biology, and the events related to biology.

```php
<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();

        if (get_post_type() == 'post' or get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'postType' => get_post_type(),
                'authorName' => get_the_author()
            ));
        }

        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
        }

        if (get_post_type() == 'program') {
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (has_excerpt()) {
                $description = get_the_excerpt();
            } else {
                $description = wp_trim_words(get_the_content(), 18);
            }

            array_push($results['events'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate->format('M'),
                'day' => $eventDate->format('d'),
                'description' => $description
            ));
        }
    }

    $programRelationshipQuery = new WP_Query(array(
        "post_type" => "professor",
        "meta_query" => array(
            array(
                "key" => "related_programs",
                "compare" => "LIKE",
                "value" => '"60"'
            )
        )
    ));

    while ($programRelationshipQuery->have_posts()) {
        $programRelationshipQuery->the_post();

        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
        }
    }

    return $results;
}

```

But: first we have hard-coded the code of the professor.

But also, the search is currently cumulative: we are searching for the keywords inside the professor post types too so we could end up with duplicated, one for the keyword search and the relationship search.

```php
<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();

        if (get_post_type() == 'post' or get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'postType' => get_post_type(),
                'authorName' => get_the_author()
            ));
        }

        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
        }

        if (get_post_type() == 'program') {
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }

        if (get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (has_excerpt()) {
                $description = get_the_excerpt();
            } else {
                $description = wp_trim_words(get_the_content(), 18);
            }

            array_push($results['events'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate->format('M'),
                'day' => $eventDate->format('d'),
                'description' => $description
            ));
        }
    }

    $programRelationshipQuery = new WP_Query(array(
        "post_type" => "professor",
        "meta_query" => array(
            array(
                "key" => "related_programs",
                "compare" => "LIKE",
                "value" => '"60"'
            )
        )
    ));

    while ($programRelationshipQuery->have_posts()) {
        $programRelationshipQuery->the_post();

        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
        }
    }

    $results["professors"] = remove_duplicate_professors($results["professors"]);

    return $results;
}


function remove_duplicate_professors($professors)
{
    $unique_professors = array();
    $seen = array();

    foreach ($professors as $professor) {
        $key = $professor['title'] . '|' . $professor['permalink'];
        if (!in_array($key, $seen)) {
            $seen[] = $key;
            $unique_professors[] = $professor;
        }
    }

    return $unique_professors;
}

```

### 3.5.35. User roles and permissions: wordpress default

Larger websites require a team effort

Too much content for one person to manage

New user > bla bla > Role

- Subscriber: cannot do anything
- Contributor: can create a rough draft, but cannot publish it
- Author: create and publish content. Can only make changes to a post they have created.
- Editor: author + can also edit other peoples content.
- Administrator: full access

### 3.5.36. Custom role

By default, an author would be able to create posts on all events, but if we want to limit to certain posts, we need to create a custom role.

Plugin - Members

Go to mu-plugins

```php
    register_post_type("event", array(
        "capability_type" => "event",
        "map_meta_cap" => true,
```

Gotcha = if you create new role, you need to add it to admin role!

### 3.5.37. Open registration

So that anyone can come and signup to get an account, to be subscriber.

We will learn about permissions, security and CRUD user specific content.

```php
 <a href="<?php echo esc_url(site_url("/wp-signup.php")); ?>" class="btn btn--small btn--dark-orange float-left">Sign Up</a>
```

We log the person. They dont need to still see the login and register button.
Lets deal with header, login, register, logout.

```php
<!DOCTYPE html>
<html <?php language_attributes() ?>>

<head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
    <header class="site-header">
        <div class="container">
            <h1 class="school-logo-text float-left">
                <a href="<?php echo site_url() ?>"><strong>Yoann</strong> Godiet</a>
            </h1>
            <span class="js-search-trigger site-header__search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
            <i class="site-header__menu-trigger fa fa-bars" aria-hidden="true"></i>
            <div class="site-header__menu group">
                <nav class="main-navigation">
                    <ul>
                        <li <?php if (is_page("about-me") or wp_get_post_parent_id(0) == 12) echo 'class="current-menu-item"' ?>><a href="<?php echo site_url("/about-me") ?>">About me</a></li>
                        <li><a href="#">CV</a></li>
                        <li <?php if (get_post_type() == "program") echo 'class="current-menu-item"' ?>><a href="<?php echo get_post_type_archive_link("program") ?>">Programs</a></li>
                        <li <?php if (get_post_type() == "event" or is_page("past-events")) echo 'class="current-menu-item"' ?>><a href="<?php echo get_post_type_archive_link("event") ?>">Events</a></li>
                        <li <?php if (get_post_type() == "post") echo 'class="current-menu-item"' ?>><a href="<?php echo site_url("/blog") ?>">Blog</a></li>
                    </ul>
                </nav>
                <div class="site-header__util">
                    <?php
                    if (is_user_logged_in()) {
                    ?>
                        <a href="<?php echo wp_logout_url(); ?>" class="btn btn--small btn--dark-orange float-left btn--with-photo">
                            <span class="site-header__avatar"><?php echo get_avatar(get_current_user_id(), 60); ?></span>
                            <span class="btn__text">Log out</span>
                        </a>
                    <?php
                    } else { ?>
                        <a href="<?php wp_login_url() ?>" class="btn btn--small btn--orange float-left push-right">Login</a>
                        <a href="<?php wp_registration_url() ?>" class="btn btn--small btn--dark-orange float-left">Sign Up</a>
                    <?php }
                    ?>

                    <span class="search-trigger js-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>
    </header>
```

To redirect user after login (they go to dashboard by default).
Also, hide the admin bar

```php

function noSubsAdminBar()
{
    $ourCurrentUser = wp_get_current_user();
    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == "subscriber") {
        show_admin_bar(false);
    }
}
add_action("wp_loaded", "noSubsAdminBar");

function redirectSubsToFrontend()
{
    $ourCurrentUser = wp_get_current_user();
    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == "subscriber") {
        wp_redirect(site_url("/"));
        exit;
    }
}
add_action("admin_init", "redirectSubsToFrontend");
```

### 3.5.38. The login

in functions.php, to change the logo's pointing to the site adress, and the styling of the page. You need to overwrite the default wordpress styling.

```php
function ourHeaderUrl()
{
    return esc_url(site_url("/"));
}
add_filter("login_headerurl", "ourHeaderUrl");

function ourLoginCSS()
{
    wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font_awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_style("main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("extra_styles", get_theme_file_uri("/build/index.css"));
}
add_action("login_enqueue_scripts", "ourloginCSS");
```

To change the "powered by wordpress":

```php
add_filter("login_headertitle", "ourLoginTitle");
function ourLoginTitle()
{
    return get_bloginfo("name");
}
```

### 3.5.39. User generated content

Create a My notes page in Pages. Find slug. Create page-my-notes, page-slug.

Update header

```php
<a href="<?php echo esc_url(site_url("/my-notes")); ?>" class="btn btn--small btn--orange float-left push-right">My notes</a>
```

Now, even not logged in person can access the /my-notes page

```php
<?php

if (!is_user_logged_in()) {
    wp_redirect(esc_url(site_url("/")));
    exit;
}

get_header();
while (have_posts()) {
    the_post();
    pageBanner();
?>

    <div class="container container--narrow page-section">
        Custom code
    </div>
<?php
}
get_footer();
?>
```

Create new type post. Note the show_ui which is to show in admin dashboard the notes. Public to false means that they are private.

```php
    register_post_type("note", array(
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
```

```php
<?php

if (!is_user_logged_in()) {
    wp_redirect(esc_url(site_url("/")));
    exit;
}

get_header();
while (have_posts()) {
    the_post();
    pageBanner();
?>

    <div class="container container--narrow page-section">
        <ul class="min-list link-list" id="my-notes">
            <?php
            $userNotes = new WP_Query((array(
                "post_type" => "note",
                "post_per_page" => -1,
                "author" => get_current_user_id()
            )));
            while ($userNotes->have_posts()) {
                $userNotes->the_post(); ?>
                <li>
                    <input class="note-title-field" value="<?php echo esc_attr(get_the_title()); ?>)">
                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
                    <textarea class="note-body-field"><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
                </li>
            <?php
            }
            ?>
        </ul>
    </div>
<?php
}
get_footer();
?>
```

In our Js file MyNotes.js, we create a delete function. We need to add in the request the nonce.

```php
function yoanngodiet_files()
{
    wp_enqueue_script("main_yoann", get_theme_file_uri("/build/index.js"), array("jquery"), "1.0", true);
    wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font_awesome", "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_style("main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("extra_styles", get_theme_file_uri("/build/index.css"));

    wp_localize_script("main_yoann", "universityData", array(
        "root_url" => get_site_url(),
        "nonce" => wp_create_nonce("wp_rest")
    ));
}
add_action("wp_enqueue_scripts", "yoanngodiet_files");
```

Now we need to dynamically set the post number to be able to delete it.

We can set this in the page-my-notes.php

```php
<li data-id="<?php the_ID();?>">
```

```js
class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    document.getElementById("my-notes").addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-note")) {
        this.deleteNote.call(this, event);
      } else if (event.target.classList.contains("edit-note")) {
        this.editNote.call(this, event);
      } else if (event.target.classList.contains("update-note")) {
        this.updateNote.call(this, event);
      }
    });

    document
      .querySelector(".submit-note")
      .addEventListener("click", this.createNote.bind(this));
  }

  createNote(event) {
    const newPost = {
      title: document.querySelector(".new-note-title").value,
      content: document.querySelector(".new-note-body").value,
      status: "publish",
    };

    fetch(`${universityData.root_url}/wp-json/wp/v2/note/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": universityData.nonce,
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".new-note-title").value = "";
        document.querySelector(".new-note-body").value = "";
        const newNoteHTML = `
        <li data-id="${data.id}">
          <input readonly class="note-title-field" value="${data.title.raw}">
          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
          <textarea readonly class="note-body-field">${data.content.raw}</textarea>
          <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
        </li>
      `;
        const myNotes = document.getElementById("my-notes");
        myNotes.insertAdjacentHTML("afterbegin", newNoteHTML);
        const newNote = myNotes.firstElementChild;
        newNote.style.display = "none";
        newNote.style.display = "block";
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  updateNote(event) {
    const thisNote = event.target.closest("li");
    const updatedPost = {
      title: thisNote.querySelector(".note-title-field").value,
      content: thisNote.querySelector(".note-body-field").value,
    };

    fetch(
      `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.getAttribute(
        "data-id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": universityData.nonce,
        },
        body: JSON.stringify(updatedPost),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.makeNoteReadonly(thisNote);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  editNote(event) {
    const thisNote = event.target.closest("li");
    if (thisNote.getAttribute("data-state") === "editable") {
      this.makeNoteReadonly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }

  deleteNote(event) {
    const thisNote = event.target.closest("li");

    fetch(
      `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.getAttribute(
        "data-id"
      )}`,
      {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": universityData.nonce,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        thisNote.style.display = "none";
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  makeNoteEditable(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.removeAttribute("readonly");
        field.classList.add("note-active-field");
      });

    const editButton = thisNote.querySelector(".edit-note");
    editButton.innerHTML =
      '<i class="fa fa-times" aria-hidden="true"></i>Cancel';

    thisNote
      .querySelector(".update-note")
      .classList.add("update-note--visible");
    thisNote.setAttribute("data-state", "editable");
  }

  makeNoteReadonly(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.setAttribute("readonly", "readonly");
        field.classList.remove("note-active-field");
      });

    const editButton = thisNote.querySelector(".edit-note");
    editButton.innerHTML =
      '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';

    thisNote
      .querySelector(".update-note")
      .classList.remove("update-note--visible");
    thisNote.setAttribute("data-state", "cancel");
  }
}

export default MyNotes;
```

### 3.5.40. Permissions

We give our subscribers the possibility to add notes and preserve security and performance.

Currently, when subscriber tries we get a forbidden.

We need to add capability type and map meta cap

```php
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
```

Now in Members / roles:

1. We need to give subscriber access to notes - create publish delete
2. We need to give admin the permissions too

We want them to be private too, so only owner can see them, amd by default anyone can visit the endpoint and see the posts!

```js
  createNote(event) {
    var newPost = {
      title: $(".new-note-title").val(),
      content: $(".new-note-body").val(),
      status: "publish",
    };
```

Setting status to private is not enough, this has to be server side.

```php
add_filter("wp_insert_post_data", "makeNotePrivate");
function makeNotePrivate($data){
    if($data["post_type"] == "note" and $data["post_status"] != "trash"){
        $data["post_status"] = "private";
    }

return $data;
}
```

Now the weird thing is that now posts have the word private in the title.

```php
<input readonly class="note-title-field" value="<?php echo str_replace("Private: ", "", esc_attr(get_the_title())); ?>">
```

We no longer need users to delete published notes and edit them - Because now that they are private they will never be considered being published.

### 3.5.41. Security: the notes and escape functions

People could write up a script tag and some code in the notes fields. But Wordpress is secure out of the box and prevents this. In Members/ general, we see an "unfiltered HTML" value, so only the admin can do this.. But what if Admin went rogue?

So if we add the script tag as admin in our notes, it will show but not execute. That is because we escaped the content here:

```php
<textarea readonly class="note-body-field"><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
```

There are different escape functions for different scenarios.

#### 3.5.41.1. Escape Attribute:

```php
<input readonly class="note-title-field" value="<?php echo str_replace("Private: ", "", esc_attr(get_the_title())); ?>">
```

#### 3.5.41.2. Escape textarea

```php
<textarea readonly class="note-body-field"><?php echo esc_textarea(wp_strip_all_tags(get_the_content())); ?></textarea>
```

### 3.5.42. Even more secure: html in the notes

```php
add_filter("wp_insert_post_data", "makeNotePrivate");
function makeNotePrivate($data){
if($data["post_type"] == "note"){
    $data["post_content"] = sanitize_textarea_field($data["post_content"]);
    $data["post_title"] = sanitize_text_field($data["post_title"]);

}

    if($data["post_type"] == "note" and $data["post_status"] != "trash"){
        $data["post_status"] = "private";
    }

return $data;
}
```

### 3.5.43. Per user post limit

We limit with functions.php.

Additionnaly there is a problem is that if we want to delete out note after we reached the limit, it will not work. This is because under the hood, when you move a post into the trash, wordpress has to edit its post status and set it to "trash".. and the function wp_insert_post_data counts as an edit.

```php
add_filter("wp_insert_post_data", "makeNotePrivate", 10, 2);
function makeNotePrivate($data, $postarr){
if($data["post_type"] == "note"){
    if(count_user_posts(get_current_user_id(), 'note') > 4 AND !$postarr['ID']) {
        die("You have reached your note limit.");
      }

    $data["post_content"] = sanitize_textarea_field($data["post_content"]);
    $data["post_title"] = sanitize_text_field($data["post_title"]);

}

    if($data["post_type"] == "note" and $data["post_status"] != "trash"){
        $data["post_status"] = "private";
    }

return $data;
}
```

ABout the 10 and 2:

$priority (int):

The priority at which the function should be executed. Lower numbers correspond to earlier execution, and higher numbers correspond to later execution. The default value is 10. Here, it is set to 10, meaning it will run at the default priority.
$accepted_args (int):

The number of arguments the function accepts. In this case, it is set to 2 because the makeNotePrivate function accepts two arguments: $data and $postarr.

We also need to add text when we have limit.

But to remove this text again, we need to check if we have now an acceptable amount of notes

So we need to have a new field in our db

```php
function university_custom_rest()
{
    register_rest_field("post", "authorName", array(
        "get_callback" => function () {
            return get_the_author();
        },
    ));
    register_rest_field("note", "userNoteCount", array(
        "get_callback" => function () {
            return count_user_posts(get_current_user_id(), "note");
        },
    ));
};
add_action("rest_api_init", "university_custom_rest");
```

### 3.5.44. Final code without jquery

```js
class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    document.getElementById("my-notes").addEventListener("click", (event) => {
      if (event.target.closest(".delete-note")) this.deleteNote(event);
      if (event.target.closest(".edit-note")) this.editNote.bind(this)(event);
      if (event.target.closest(".update-note"))
        this.updateNote.bind(this)(event);
    });

    document
      .querySelector(".submit-note")
      .addEventListener("click", this.createNote.bind(this));
  }

  async createNote(event) {
    const newPost = {
      title: document.querySelector(".new-note-title").value,
      content: document.querySelector(".new-note-body").value,
      status: "private",
    };

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": universityData.nonce,
          },
          body: JSON.stringify(newPost),
        }
      );
      const data = await response.json();

      if (response.ok) {
        document.querySelector(".new-note-title").value = "";
        document.querySelector(".new-note-body").value = "";

        const noteItem = document.createElement("li");
        noteItem.dataset.id = data.id;
        noteItem.innerHTML = `
          <input readonly class="note-title-field" value="${data.title.raw}">
          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
          <textarea readonly class="note-body-field">${data.content.raw}</textarea>
          <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
        `;
        document.getElementById("my-notes").prepend(noteItem);
        noteItem.style.display = "none";
        noteItem.offsetHeight; // Trigger reflow
        noteItem.style.display = "block";
      } else if (data.responseText === "You have reached your note limit.") {
        console.log("nope");
        document.querySelector(".note-limit-message").classList.add("active");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async updateNote(event) {
    const thisNote = event.target.closest("li");
    const updatedPost = {
      title: thisNote.querySelector(".note-title-field").value,
      content: thisNote.querySelector(".note-body-field").value,
    };

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": universityData.nonce,
          },
          body: JSON.stringify(updatedPost),
        }
      );
      const data = await response.json();

      if (response.ok) {
        this.makeNoteReadonly(thisNote);
        console.log(data);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  editNote(event) {
    const thisNote = event.target.closest("li");
    if (thisNote.dataset.state === "editable") {
      this.makeNoteReadonly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }

  async deleteNote(event) {
    const thisNote = event.target.closest("li");

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
        {
          method: "DELETE",
          headers: {
            "X-WP-Nonce": universityData.nonce,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        thisNote.style.display = "none";
        if (data.userNoteCount < 5) {
          document
            .querySelector(".note-limit-message")
            .classList.remove("active");
        }
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  makeNoteEditable(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.removeAttribute("readonly");
        field.classList.add("note-active-field");
      });
    thisNote.querySelector(".edit-note").innerHTML =
      '<i class="fa fa-times" aria-hidden="true"></i>Cancel';
    thisNote
      .querySelector(".update-note")
      .classList.add("update-note--visible");
    thisNote.dataset.state = "editable";
  }

  makeNoteReadonly(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.setAttribute("readonly", "readonly");
        field.classList.remove("note-active-field");
      });
    thisNote.querySelector(".edit-note").innerHTML =
      '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';
    thisNote
      .querySelector(".update-note")
      .classList.remove("update-note--visible");
    thisNote.dataset.state = "cancel";
  }
}

export default MyNotes;
```

### 3.5.45. Let user like or heart a professor

Here we create a custom post type called like. Each post will represent a one to one relationship between the id number of the current user and id number of the liked professor

```php
register_post_type("like", array(
    "supports" => array("title"),
    "public" => false,
    "show_ui" => true,
    "menu_icon" => "dashicons-heart",
    "labels" => array(
        "name" => "Likes",
        "add_new_item" => "Add new Like",
        "add_new" => "Add new Like",
        "edit_item" => "Edit Like",
        "all_items" => "All Likes",
        "singular_name" => "Like",
    )
));
```

Then new field ACF

We note that for dr strange, we have his id being 69 - we create a new like with professor id 69 for testing purposes.

```bash
http://yoanngodiet.local/wp-admin/post.php?post=69&action=edit
```

```php
<?php
  $likeCount = new WP_Query(array(
    'post_type' => 'like',
    'meta_query' => array(
      array(
        'key' => 'liked_professor_id',
        'compare' => '=',
        'value' => get_the_ID()
      )
    )
  ));
?>
<span class="like-box" data-like="<?php if (isset($existQuery->posts[0]->ID)) echo $existQuery->posts[0]->ID; ?>" data-professor="<?php the_ID(); ?>" data-exists="<?php echo $existStatus; ?>">
<i class="fa fa-heart-o" aria-hidden="true"></i>
<i class="fa fa-heart" aria-hidden="true"></i>
<span class="like-count"><?php echo $likeCount->found_posts; ?></span></span>
    <?php the_content(); ?>
</div>
</div>
```

### 3.5.46. Creating custom POST and DELETE endpoints

The reason as to why we do this = X

```php
<?php

add_action("rest_api_init", "universityLikesRoutes");
function universityLikesRoutes(){
    register_rest_route("university/v1", "manageLike", array(
        "methods" => "POST",
        "callback" => "createLike"
    ));
    register_rest_route("university/v1", "manageLike", array(
        "methods" => "DELETE",
        "callback" => "deleteLike"
    ));
}

function createLike($data){
    $professor = sanitize_text_field($data["professorId"]);
    wp_insert_post(array(
        "post_type" => "like",
        "post_status" => "publish",
        "post_title" => "Our php create post test",
        "meta_input" => array(
            "liked_professor_id" => $professor
        )
    ));

}

function deleteLike(){
    return "Deleting a like";
}
```

and

```js
class Like {
  constructor() {
    this.events();
  }

  events() {
    document.querySelectorAll(".like-box").forEach((likeBox) => {
      likeBox.addEventListener("click", this.ourClickDispatcher.bind(this));
    });
  }

  ourClickDispatcher(event) {
    const currentLikeBox = event.target.closest(".like-box");

    if (currentLikeBox.dataset.exists === "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  async createLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            professorId: currentLikeBox.dataset.professor,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      // Update the DOM or handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      // Update the DOM or handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default Like;
```

### 3.5.47. Enforce limit of one like per user/teacher - being logged in - permissions

```js
class Like {
  constructor() {
    this.events();
  }

  events() {
    document.querySelectorAll(".like-box").forEach((likeBox) => {
      likeBox.addEventListener("click", this.ourClickDispatcher.bind(this));
    });
  }

  ourClickDispatcher(event) {
    const currentLikeBox = event.target.closest(".like-box");

    if (currentLikeBox.getAttribute("data-exists") === "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  async createLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "POST",
          headers: {
            "X-WP-Nonce": universityData.nonce,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            professorId: currentLikeBox.dataset.professor,
          }),
        }
      );

      const data = await response.json();
      currentLikeBox.setAttribute("data-exists", "yes");
      let likeCount = parseInt(
        currentLikeBox.querySelector(".like-count").innerHTML,
        10
      );
      likeCount++;
      currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
      currentLikeBox.setAttribute("data-like", data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "DELETE",
          headers: {
            "X-WP-Nonce": universityData.nonce,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            like: currentLikeBox.getAttribute("data-like"),
          }),
        }
      );

      await response.json();
      currentLikeBox.setAttribute("data-exists", "no");
      let likeCount = parseInt(
        currentLikeBox.querySelector(".like-count").innerHTML,
        10
      );
      likeCount--;
      currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
      currentLikeBox.setAttribute("data-like", "");
    } catch (error) {
      console.error(error);
    }
  }
}

export default Like;
```

# 4. Wordpress plugins development

## 4.1. Base setup

1. Create new folder in wp-content / plugins / new folder. Unique name in case of publishing!
2. php file with relevant name

```php
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
  return $content . '<p>My name is Yooann </p>';
}
```

```php
add_filter("the_content", "addToEndOfPost");
function addToEndOfPost($content){
    if(is_single() && is_main_query()){
        return $content . '<p>My name is Yooann </p>';
    }
        return $content;
}
```

## 4.2. Adding settings page

```php
add_action('admin_menu', 'ourPluginSettingsMenu');
function ourPluginSettingsMenu(){
        add_options_page( 'Word count settings', 'Word count', "manage_options", 'word-count-settings', 'OurSettingsPageHTML');
}

function OurSettingsPageHTML(){
    echo "<h1>Word count settings</h1>";
}
```

To avoid the problem of setting unique function names:

```php
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
        add_action('admin_menu', array(
            $this,
            'adminPage'
        ));
    }

    function adminPage(){
        add_options_page( 'Word count settings', 'Word count', "manage_options", 'word-count-settings', array($this, 'ourHTML'));
}

    function ourHTML(){
        echo "<h1>Word count settings</h1>";
    }
}

$wordCountAndTimePlugin = new WordCountAndTimePlugin();
```

Where does wordpress stores settings and options values?
In Local: Database / open adminer / wp_options / Select data

```php
<?php

/*
    Plugin Name: Our test plugin
    Description: This is our first attempt on writing a custom plugin in WordPress
    Version: 1.0
    Authos: Yoann
    Author URI: http://yoann.com

*/
class WordCountAndTimePlugin {
    function __construct() {
      add_action('admin_menu', array($this, 'adminPage'));
      add_action('admin_init', array($this, 'settings'));
    }

    function settings() {
      add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');
      add_settings_field('wcp_location', 'Display Location', array($this, 'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
      register_setting('wordcountplugin', 'wcp_location', array('sanitize_callback' => 'sanitize_text_field', 'default' => '0'));
    }

    function locationHTML() { ?>
      <select name="wcp_location">
        <option value="0">Beginning of post</option>
        <option value="1">End of post</option>
      </select>
    <?php }

    function adminPage() {
      add_options_page('Word Count Settings', 'Word Count', 'manage_options', 'word-count-settings-page', array($this, 'ourHTML'));
    }

    function ourHTML() { ?>
      <div class="wrap">
        <h1>Word Count Settings</h1>
        <form action="options.php" method="POST">
        <?php
          settings_fields('wordcountplugin');
          do_settings_sections('word-count-settings-page');
          submit_button();
        ?>
        </form>
      </div>
    <?php }
  }

  $wordCountAndTimePlugin = new WordCountAndTimePlugin();
```

Adding the settings

```php
<?php

/*
    Plugin Name: Our test plugin
    Description: This is our first attempt on writing a custom plugin in WordPress
    Version: 1.0
    Authos: Yoann
    Author URI: http://yoann.com

*/

class WordCountAndTimePlugin {
    function __construct() {
      add_action('admin_menu', array($this, 'adminPage'));
      add_action('admin_init', array($this, 'settings'));
      add_filter('the_content', array($this, 'ifWrap'));
    }

    function ifWrap($content) {
      if (is_main_query() AND is_single() AND
      (
        get_option('wcp_wordcount', '1') OR
        get_option('wcp_charactercount', '1') OR
        get_option('wcp_readtime', '1')
      )) {
        return $this->createHTML($content);
      }
      return $content;
    }

    function createHTML($content) {
      $html = '<h3>' . esc_html(get_option('wcp_headline', 'Post Statistics')) . '</h3><p>';

      // get word count once because both wordcount and read time will need it.
      if (get_option('wcp_wordcount', '1') OR get_option('wcp_readtime', '1')) {
        $wordCount = str_word_count(strip_tags($content));
      }

      if (get_option('wcp_wordcount', '1')) {
        $html .= 'This post has ' . $wordCount . ' words.<br>';
      }

      if (get_option('wcp_charactercount', '1')) {
        $html .= 'This post has ' . strlen(strip_tags($content)) . ' characters.<br>';
      }

      if (get_option('wcp_readtime', '1')) {
        $html .= 'This post will take about ' . round($wordCount/225) . ' minute(s) to read.<br>';
      }

      $html .= '</p>';

      if (get_option('wcp_location', '0') == '0') {
        return $html . $content;
      }
      return $content . $html;
    }

    function settings() {
      add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');

      add_settings_field('wcp_location', 'Display Location', array($this, 'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
      register_setting('wordcountplugin', 'wcp_location', array('sanitize_callback' => array($this, 'sanitizeLocation'), 'default' => '0'));

      add_settings_field('wcp_headline', 'Headline Text', array($this, 'headlineHTML'), 'word-count-settings-page', 'wcp_first_section');
      register_setting('wordcountplugin', 'wcp_headline', array('sanitize_callback' => 'sanitize_text_field', 'default' => 'Post Statistics'));

      add_settings_field('wcp_wordcount', 'Word Count', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_wordcount'));
      register_setting('wordcountplugin', 'wcp_wordcount', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));

      add_settings_field('wcp_charactercount', 'Character Count', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_charactercount'));
      register_setting('wordcountplugin', 'wcp_charactercount', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));

      add_settings_field('wcp_readtime', 'Read Time', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_readtime'));
      register_setting('wordcountplugin', 'wcp_readtime', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));
    }

    function sanitizeLocation($input) {
      if ($input != '0' AND $input != '1') {
        add_settings_error('wcp_location', 'wcp_location_error', 'Display location must be either beginning or end.');
        return get_option('wcp_location');
      }
      return $input;
    }

    // reusable checkbox function
    function checkboxHTML($args) { ?>
      <input type="checkbox" name="<?php echo $args['theName'] ?>" value="1" <?php checked(get_option($args['theName']), '1') ?>>
    <?php }

    function headlineHTML() { ?>
      <input type="text" name="wcp_headline" value="<?php echo esc_attr(get_option('wcp_headline')) ?>">
    <?php }

    function locationHTML() { ?>
      <select name="wcp_location">
        <option value="0" <?php selected(get_option('wcp_location'), '0') ?>>Beginning of post</option>
        <option value="1" <?php selected(get_option('wcp_location'), '1') ?>>End of post</option>
      </select>
    <?php }

    function adminPage() {
      add_options_page('Word Count Settings', 'Word Count', 'manage_options', 'word-count-settings-page', array($this, 'ourHTML'));
    }

    function ourHTML() { ?>
      <div class="wrap">
        <h1>Word Count Settings</h1>
        <form action="options.php" method="POST">
        <?php
          settings_fields('wordcountplugin');
          do_settings_sections('word-count-settings-page');
          submit_button();
        ?>
        </form>
      </div>
    <?php }
  }

  $wordCountAndTimePlugin = new WordCountAndTimePlugin();

```
