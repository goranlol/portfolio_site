

<?php

	$args = array(
		'category_name'=>'visible',
	);

	$postList = get_posts($args);

	$client = get_post_meta($post->ID, 'client', TRUE);
	$brief = get_post_meta($post->ID, 'brief', TRUE);
	$role = get_post_meta($post->ID, 'role', TRUE);
	$credits = get_post_meta($post->ID, 'credits', TRUE);

?>

	<div class="label-cnt client">
		<span class="label">Client</span><br>
		<div class="heading"><?php echo $client ?></div>
	</div>

	<div class="label-cnt proj">
		<span class="label">Project</span><br>
		<div class="heading"><?php the_title(); ?></div>
	</div>


	<div class="main-col">

    <div class="header-splash">
      <div class="splash-underlay">
        <img  src="<?php the_post_thumbnail_url('full'); ?>">
      </div>

      <div class="splash-image">
		    <img src="<?php the_post_thumbnail_url('full'); ?>">
      </div>

    </div>



    <div class="creds">
      <p>
      <span class="label">Role</span><br>
      <?php echo $role ?>
      </p>

      <p>
      <span class="label">Brief</span><br>
      <?php echo $brief ?>
      </p>

      <p>
      <span class="label">Creds</span><br>
      <?php echo $credits ?>
      </p>
    </div>

		<?php the_content(); ?>

	</div>

<div id="lightbox-wrapper">
  <div id="lightbox" class="lightbox" > 
    
      <a tabindex="2" id="lightbox-close" class="lightbox-closer" href="#_" ></a>
      <a tabindex="3" id="gotoPrev" class="lightbox-navs lightbox-gotoPrev" href="#_" > &#x2190 </a>
      <a tabindex="4" id="gotoNext" class="lightbox-navs lightbox-gotoNext" href="#_" > &#x2192 </a>

      <img id="lightbox-image" class="lightbox-image" src="">

  </div>
</div>

</body>
</html>

<script src="<?php echo get_bloginfo('template_directory'); ?>/lightbox.js"></script>