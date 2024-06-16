<?php
get_header();
while (have_posts()) {
    the_post();
    $program_title = get_the_title(); ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/ocean.jpg"); ?>"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title() ?></h1>
            <div class="page-banner__intro">
                <p>Implement that later.</p>
            </div>
        </div>
    </div>
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
                            <img class="professor-card__image" src="<?php the_post_thumbnail_url() ?>">
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
                    $relatedEvents->the_post(); ?>
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
            <?php }
            }



            ?>
        </div>
    </div>
<?php
}
get_footer();
?>