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
  - [3.6. Summary](#36-summary)


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

## 3.6. Summary

1. The loop
2. the_title(), the_content(), the_post()
3. Adding stylesheets in functions.php