<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package {%= title %}
 */
get_header(); ?>
	<main id="main" class="site-main" role="main">
		<?php do_action( '{%= prefix %}_before_main' ); ?>
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php do_action( '{%= prefix %}_before_loop' ); ?>
				<?php get_template_part( 'content', get_post_format() ); ?>
				<?php do_action( '{%= prefix %}_after_loop' ); ?>
			<?php endwhile; ?>
		<?php else : ?>
			<?php get_template_part( 'no-results', 'index' ); ?>
		<?php endif; ?>
		<?php do_action( '{%= prefix %}_after_main' ); ?>
	</main><!-- #main -->
<?php get_footer(); ?>
