<?php get_header(); ?>

  <div class="folio-items">

			<?php
			$args = array(
				'category_name'=>'visible',
			);


			$FP_Items = new WP_Query($args);

			if ( $FP_Items->have_posts() ) : while ( $FP_Items->have_posts() ) : $FP_Items->the_post();

				get_template_part( 'theme-parts/content', get_post_format() );

			endwhile; endif;
			?>

  </div>

<?php get_footer(); ?>
