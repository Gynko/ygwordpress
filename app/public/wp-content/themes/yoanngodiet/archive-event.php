<?php
pageBanner(array(
    "title" => "All Events",
    "subtitle" => "See what is going on in our world"
));
get_header();
?>
<div class="container container--narrow page-section">
    <?php
    while (have_posts()) {
        the_post();
        get_template_part("template-parts/content", get_post_type());
    }
    echo paginate_links();
    ?>
    <hr class="section-break">
    <p>Looking for past events? <a href="<?php echo site_url("/past-events") ?>">Check out the archive.</a></p>

</div>
<?php
get_footer();
?>