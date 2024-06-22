<?php
get_header();
pageBanner();
while (have_posts()) {
    the_post();
    $program_title = get_the_title(); ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link("program") ?>"><i class="fa fa-home" aria-hidden="true"></i> All programs</a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>

        <div class="generic-content">
            <?php
            $today = date("Ymd");
            $current_program_id = get_the_ID();

            the_content();
            // Query for related professors
            $relatedProfessors = new WP_Query(array(
                "posts_per_page" => -1,
                "post_type" => "professor",
                "orderby" => "title",
                "order" => "ASC",
                'meta_query' => array(
                    array(
                        'key' => 'related_programs',
                        'compare' => 'LIKE',
                        'value' => '"' . $current_program_id . '"'
                    )
                )
            ));

            if ($relatedProfessors->have_posts()) {
                echo '<hr class="section-break">';
                echo '<h2 class="headline headline--medium">Professors in ' . $program_title . '</h2>';
                echo '<ul class="professor-cards">';
                while ($relatedProfessors->have_posts()) {
                    $relatedProfessors->the_post(); ?>
                    <li class="professor-card__list-item">
                        <a class="professor-card" href="<?php the_permalink(); ?>">
                            <img class="professor-card__image" src="<?php the_post_thumbnail_url("professorLandscape") ?>">
                            <span class="professor-card__name"><?php the_title(); ?></span>
                        </a>
                    </li>
            <?php }
                echo '</ul>';
            }
            // Query for related events
            $relatedEvents = new WP_Query(array(
                "posts_per_page" => -1,
                "post_type" => "event",
                "orderby" => "meta_value_num",
                "meta_key" => "event_date",
                "order" => "ASC",
                'meta_query' => array(
                    'relation' => 'AND',
                    array(
                        "key" => "event_date",
                        "compare" => ">=",
                        "value" => $today,
                        "type" => "numeric"
                    ),
                    array(
                        'key' => 'related_programs',
                        'compare' => 'LIKE',
                        'value' => '"' . $current_program_id . '"'
                    )
                )
            ));

            wp_reset_postdata();

            if ($relatedEvents->have_posts()) {
                echo '<hr class="section-break">';
                echo '<h2 class="headline headline--medium">Upcoming ' . get_the_title() . ' events</h2>';
                while ($relatedEvents->have_posts()) {
                    $relatedEvents->the_post();
                    get_template_part("template-parts/content", get_post_type());
                }
            }
            ?>
        </div>
    </div>
<?php
}
get_footer();
?>