<?php
get_header();
pageBanner();
while (have_posts()) {
    the_post(); ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link("event") ?>"><i class="fa fa-home" aria-hidden="true"></i> Event Home</a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>

        <div class="generic-content">
            <?php the_content() ?>
            <?php
            // Retrieve related programs
            $related_programs = get_field('related_programs');

            if ($related_programs) {
                echo '<hr class="section-break">';
                echo '<h2 class="headline headline--medium">Related Programs</h2>';
                echo '<ul class="link-list min-list">';
                foreach ($related_programs as $program) {
                    echo '<li><a href="' . get_permalink($program->ID) . '">' . get_the_title($program->ID) . '</a></li>';
                }
                echo '</ul>';
            }
            ?>
        </div>
    </div>

<?php
}
get_footer();
