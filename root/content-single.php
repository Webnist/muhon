<?php
/**
 * @package {%= title %}
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php do_action( '{%= prefix %}_before_single_entry' ); ?>
	<header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>
		<?php do_action( '{%= prefix %}_single_entry_header' ); ?>
	</header><!-- .entry-header -->
	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages(); ?>
		<?php do_action( '{%= prefix %}_single_entry_content' ); ?>
	</div><!-- .entry-content -->
	<?php if ( has_action( '{%= prefix %}_single_entry_footer' ) ) : ?>
		<footer class="entry-footer">
			<?php do_action( '{%= prefix %}_single_entry_footer' ); ?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
	<?php do_action( '{%= prefix %}_after_single_entry' ); ?>
</article><!-- #post-## -->