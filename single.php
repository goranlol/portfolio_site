<?php get_template_part('theme-parts/single-header');?>

	
	<?php 
		if ( have_posts() ) : while ( have_posts() ) : the_post();
			get_template_part( 'theme-parts/single-content', get_post_format() );
	

		endwhile; 
		endif; 


	
	?>

</div>

</html>
</body>