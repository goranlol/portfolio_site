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
  <div id="lightbox" class="lightbox" tabindex="-1" > 
      <a id="lightbox-close"> 
        <img id="lightbox-image" src="">
      </a>
  </div>
</div>

</body>


<script>

  document.addEventListener('DOMContentLoaded', function(){

    // Make lightbox functional 
    const lightbox = document.querySelector('[id="lightbox"]');
    const lightboxWrap = document.querySelector('[id="lightbox-wrapper"]');
    const lightboxCloser = document.querySelector('[id="lightbox-close"]'); 
    const lightboxImage = document.querySelector('[id="lightbox-image"]');

    console.log(lightbox.classList);

    lightboxCloser.addEventListener('click', function(event){

      lightbox.setAttribute('class', 'lightbox');
      
      setTimeout(function(){
        lightboxWrap.style.top = "-100vh";
      }, 350);

    });

    // Grab images in the post that we could lightbox
    const lightboxImages = document.querySelectorAll('[class^="wp-image-"]'), len = lightboxImages.length;

    // Loop through and set up images as clickable
    for (var i=0; i<len; i++) {
	    lightboxImages[i].style.cursor = "pointer";
      
      // Send clicked image to lightbox 
      lightboxImages[i].addEventListener('click', function(event){
            
        lightbox.setAttribute('class', 'lightbox-open');
        lightboxWrap.style.top = "0vh";
  
        // Source URL of the image that we're going to display in the lightbox 
        imgSrc = this.getAttribute('src');
        lightboxImage.setAttribute('src', imgSrc);

      });
	  
    };

  });


  /* OLD CODE
 
    // Make lightbox functional 
    const lightbox = document.querySelector('[id="lightbox"]');
    const lightboxCloser = document.querySelector('[id="lightbox-close"]'); 


    lightboxCloser.addEventListener('click', function(event){
      lightbox.setAttribute('class', 'lightbox-wrapper');
    });

    // Grab images in the post that we could lightbox
    const lightboxImages = document.querySelectorAll('[class^="wp-image-"]'), len = lightboxImages.length;

    // Loop through and set up images as clickable
    for (var i=0; i<len; i++) {
	    lightboxImages[i].style.cursor = "pointer";

      // Source URL of the image that we're going to display in the lightbox 
      imgSrc = lightboxImages[i].getAttribute('src');
      
      // Send clicked image to lightbox 
      lightboxImages[i].addEventListener('click', function(event){      
         lightbox.setAttribute('class', 'lightbox-wrapper-open');
         alert(imgSrc);
      });
	  
    };

  */

</script>