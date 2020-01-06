// Primitive Lightbox 
document.addEventListener('DOMContentLoaded', function(){

    // Check if we're on a screen big enough to warrant a lightbox
    if(window.innerWidth > 840){

        // Make lightbox functional 


        const lightbox = document.querySelector('[id="lightbox"]');
        const lightboxWrap = document.querySelector('[id="lightbox-wrapper"]');
        const lightboxCloser = document.querySelector('[id="lightbox-close"]'); 
        const lightboxImage = document.querySelector('[id="lightbox-image"]');

        const lightboxPrevImage = document.querySelector('[id="lightbox-prev-image"]');
        const lightboxNextImage = document.querySelector('[id="lightbox-next-image"]');

        lightboxCloser.addEventListener('click', function(event){

            lightbox.setAttribute('class', 'lightbox');
            
            setTimeout(function(){
                lightboxWrap.style.top = "-100vh";
            }, 350);
    
        });

        // Grab images in the post that we could lightbox
        const lightboxImages = document.querySelectorAll('[class^="wp-image"]'), len = lightboxImages.length;

        // Loop through and set up images as clickable
        for (var i=0; i<len; i++) {
            lightboxImages[i].style.cursor = "pointer";
        
            console.log(lightboxImages[i]);

            // Send images to lightbox 
            lightboxImages[i].addEventListener('click', function(event){

                lightbox.setAttribute('class', 'lightbox-open');
                lightboxWrap.style.top = "0vh";
        
                lightboxImage.setAttribute('src', this.getAttribute('src'));

            });
        
        };

    }



  });
