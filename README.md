# My wordpress personal website <!-- omit in toc -->

# Table of content <!-- omit in toc -->

- [1. Purpose](#1-purpose)
- [2. Installation](#2-installation)
- [3. Learning](#3-learning)
  - [3.1. PHP](#31-php)
  - [3.2. Creating a new theme](#32-creating-a-new-theme)
  - [3.3. PHP functions](#33-php-functions)
  - [3.4. PHP arrays](#34-php-arrays)


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