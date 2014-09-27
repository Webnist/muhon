<?php
/**
 * The Template for displaying all single posts.
 *
 * @package {%= title %}
 */
get_header(); ?>
	<main id="main" class="site-main" role="main">
		<?php do_action( '{%= prefix %}_before_main' ); ?>
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php do_action( '{%= prefix %}_before_loop' ); ?>
				<?php get_template_part( 'content', 'single' ); ?>
				<?php do_action( '{%= prefix %}_after_loop' ); ?>
			<?php endwhile; ?>
		<?php else : ?>
			<?php get_template_part( 'no-results', 'index' ); ?>
		<?php endif; ?>
		<?php do_action( '{%= prefix %}_after_main' ); ?>
	</main><!-- #main -->
<?php get_footer(); ?>
