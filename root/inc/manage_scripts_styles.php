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

	// Loads JavaScript file with functionality specific to {%= file_name %}.
	if ( file_exists( get_stylesheet_directory() . '/js/{%= file_name %}.js' ) )
		wp_enqueue_script( '{%= file_name %}-script', get_stylesheet_directory_uri() . '/js/{%= file_name %}.js', array('jquery'), {%= prefix %}_file_time_stamp( '/js/{%= file_name %}.js' ), true );

	// Loads our normalize css
	wp_enqueue_style( 'muhon-style', get_stylesheet_directory_uri() . '/css/normalize.min.css', array(), '3.0.1' );

	// Loads our main stylesheet.
	wp_enqueue_style( '{%= file_name %}-style', get_stylesheet_directory_uri() . '/style.css', array(), {%= file_name %}_file_time_stamp( '/style.css' ) );

}
add_action( 'wp_enqueue_scripts', '{%= prefix %}_scripts_styles' );
