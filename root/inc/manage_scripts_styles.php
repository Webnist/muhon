<?php
/**
 * Name: {%= title %} Management Scripts Styles
 * Description: Management Scripts Styles
 * Author: {%= author_name %}
 * Version: 0.7.1.0
 * @package WordPress
 * @subpackage {%= title %}
**/

function {%= prefix %}_scripts_styles() {

	// Loads JavaScript file with functionality specific to {%= prefix %}.
	if ( file_exists( get_stylesheet_directory() . '/js/{%= prefix %}.js' ) )
		wp_enqueue_script( '{%= prefix %}-script', get_stylesheet_directory_uri() . '/js/{%= prefix %}.js', array('jquery'), {%= prefix %}_file_time_stamp( '/js/{%= prefix %}.js' ), true );

	// Loads our main stylesheet.
	wp_enqueue_style( '{%= prefix %}-style', get_stylesheet_directory_uri() . '/style.css', array(), {%= prefix %}_file_time_stamp( '/style.css' ) );

}
add_action( 'wp_enqueue_scripts', '{%= prefix %}_scripts_styles' );
