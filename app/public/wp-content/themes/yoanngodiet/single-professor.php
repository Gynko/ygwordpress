<?php
get_header();
while (have_posts()) {
    the_post();
    pageBanner();
?>

    <div class="container container--narrow page-section">
        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
                    <?php the_post_thumbnail("professorPortrait") ?>
                </div>
                <div class="two-thirds">
                    <?php the_content(); ?>
                </div>
            </div>
            <?php
            // Retrieve related programs
            $related_programs = get_field('related_programs');

            if ($related_programs) {
                echo '<hr class="section-break">';
                echo '<h2 class="headline headline--medium">Subject(s) taught</h2>';
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
