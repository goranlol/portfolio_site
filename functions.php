<?php

	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );

	remove_filter( 'the_content', 'wpautop' );
  remove_filter( 'the_excerpt', 'wpautop' );

?>
