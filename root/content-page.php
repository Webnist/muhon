<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package {%= title %}
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php do_action( '{%= prefix %}_before_page_entry' ); ?>
	<header class="entry-header">
		<?php do_action( '{%= prefix %}_page_entry_header' ); ?>
	</header><!-- .entry-header -->
	<div class="entry-content">
	<?php the_content(); ?>
	<?php wp_link_pages(); ?>
		<?php do_action( '{%= prefix %}_page_entry_content' ); ?>
	</div><!-- .entry-content -->
	<?php if ( has_action( '{%= prefix %}_page_entry_footer' ) ) : ?>
		<footer class="entry-footer">
			<?php do_action( '{%= prefix %}_page_entry_footer' ); ?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
	<?php do_action( '{%= prefix %}_after_page_entry' ); ?>
</article><!-- #post-## -->
