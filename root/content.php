<?php
/**
 * @package {%= title %}
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php do_action( '{%= prefix %}_before_archive_entry' ); ?>
	<header class="entry-header">
		<?php do_action( '{%= prefix %}_before_archive_entry_header' ); ?>
		<h1 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
		<?php do_action( '{%= prefix %}_after_archive_entry_header' ); ?>
	</header><!-- .entry-header -->
	<section class="entry-summary">
		<?php do_action( '{%= prefix %}_before_archive_entry_content' ); ?>
		<?php the_excerpt(); ?>
		<?php do_action( '{%= prefix %}_after_archive_entry_content' ); ?>
	</section><!-- .entry-summary -->
	<?php if ( has_action( '{%= prefix %}_archive_entry_footer' ) ) : ?>
		<footer class="entry-footer">
			<?php do_action( '{%= prefix %}_archive_entry_footer' ); ?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
	<?php do_action( '{%= prefix %}_after_archive_entry' ); ?>
</article><!-- #post-## -->
