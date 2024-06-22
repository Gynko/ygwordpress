<?php
pageBanner(array(
    "title" => "All Programs",
    "subtitle" => "We have a lot of programs going on"
));
get_header();
?>
<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <?php
        while (have_posts()) {
            the_post(); ?>
            <li><a href="<?php the_permalink() ?>"><?php the_title() ?></a></li>
        <?php
        }
        echo paginate_links();
        ?>
    </ul>
</div>
<?php
get_footer();
?>