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
    - [3.5.22. Page banner dynamic bg image -  and reusable code](#3522-page-banner-dynamic-bg-image----and-reusable-code)
    - [3.5.23. Get template part](#3523-get-template-part)
    - [3.5.24. Create a function vs get\_template\_part?](#3524-create-a-function-vs-get_template_part)
    - [3.5.25. Getting ready for Javascript](#3525-getting-ready-for-javascript)
    - [3.5.26. Campuses](#3526-campuses)
    - [3.5.27. Live search](#3527-live-search)
    - [3.5.28. Load WP content with JS](#3528-load-wp-content-with-js)
    - [3.5.29. Searching through posts, events, anything](#3529-searching-through-posts-events-anything)
    - [3.5.30. Search - Add Custom fields to data](#3530-search---add-custom-fields-to-data)
    - [3.5.31. Create a custom endpoint for search](#3531-create-a-custom-endpoint-for-search)
    - [3.5.32. The raw data](#3532-the-raw-data)
    - [3.5.33. Using the new endpoint from the frontend](#3533-using-the-new-endpoint-from-the-frontend)

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

### 3.5.22. Page banner dynamic bg image -  and reusable code

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
    constructor(){
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

    events(){
        this.openButton.addEventListener("click", this.openOverlay.bind(this));
        this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
        document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
    }

    openOverlay(){
        this.searchOverlay.classList.add("search-overlay--active");
        document.body.classList.add("body-no-scroll");
        this.isOverlayOpened = true;
    }

    closeOverlay(){
        this.searchOverlay.classList.remove("search-overlay--active");
        document.body.classList.remove("body-no-scroll");
        this.isOverlayOpened = false;
    }

    keyPressDispatcher(event){
        if(event.key === "Escape" && this.isOverlayOpened){
            this.closeOverlay();
        } else if((event.key === "s" || event.key === "S") && !this.isOverlayOpened){
            const activeElement = document.activeElement;
            if (activeElement.tagName !== "INPUT" && activeElement.tagName !== "TEXTAREA") {
                this.openOverlay();
            }
        }
    }

    typingLogic(){
        if (this.searchField.value !== this.previousValue){
            clearTimeout(this.typingTimer);

            if(this.searchField.value !== ""){
                if(!this.isSpinnerVisible){
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
        fetch(universityData.root_url + "/wp-json/wp/v2/posts?search=" + this.searchField.value)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(posts => {
                if (posts.length > 0) {
                    this.resultsDiv.innerHTML = posts.map(post => `
                        <div class="post" style="background-color:pink">
                            <h1>${post.title.rendered}</h1>
                            <p>${post.content.rendered}</p>
                            <a href="${post.link}">${post.title.rendered}</a>
                        </div>
                    `).join('');
                    this.isSpinnerVisible = false;
                } else {
                    this.resultsDiv.innerHTML = "no matches found."
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
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
      this.openButtons.forEach(button => button.addEventListener("click", this.openOverlay.bind(this)));
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
      fetch(`${universityData.root_url}/wp-json/university/v1/search?term=${this.searchField.value}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(results => {
          results.generalInfo = results.generalInfo || [];
          results.professors = results.professors || [];
          results.programs = results.programs || [];
          results.campuses = results.campuses || [];
          results.events = results.events || [];
  
          this.resultsDiv.innerHTML = `
            <div class="row">
              <div class="one-third">
                <h2 class="search-overlay__section-title">General Information</h2>
                ${results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>"}
                  ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType === "post" ? `by ${item.authorName}` : ""}</li>`).join("")}
                ${results.generalInfo.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Programs</h2>
                ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                  ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                ${results.programs.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Professors</h2>
                ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
                  ${results.professors.map(item => `
                    <li class="professor-card__list-item">
                      <a class="professor-card" href="${item.permalink}">
                        <img class="professor-card__image" src="${item.image}">
                        <span class="professor-card__name">${item.title}</span>
                      </a>
                    </li>
                  `).join("")}
                ${results.professors.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Campuses</h2>
                ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                  ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                ${results.campuses.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Events</h2>
                ${results.events.length ? "" : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
                  ${results.events.map(item => `
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
                  `).join("")}
              </div>
            </div>
          `;
          this.isSpinnerVisible = false;
        })
        .catch(error => console.error('Error fetching results:', error));
    }
  
    keyPressDispatcher(e) {
      if (e.keyCode === 83 && !this.isOverlayOpen && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
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
      document.body.insertAdjacentHTML("beforeend", `
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
      `);
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