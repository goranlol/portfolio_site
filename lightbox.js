// Primitive Lightbox 

ImageSrc = 0;
lightboxOpen = false;

document.addEventListener('DOMContentLoaded', function(){

    // Init  

    const lightbox = document.querySelector('[id="lightbox"]');
    const lightboxWrap = document.querySelector('[id="lightbox-wrapper"]');
    const lightboxCloser = document.querySelector('[id="lightbox-close"]'); 
    const currImage = document.querySelector('[id="lightbox-image"]');

    const prevImage = document.querySelector('[id="lightbox-prev-image"]');
    const nextImage = document.querySelector('[id="lightbox-next-image"]');

    // Grab images in the post that we could lightbox
    var imageScour = document.querySelectorAll('[class^="wp-image"]');
    const lightboxImages = Object.values(imageScour);
    len = imageScour.length;

    // Loop through and set up images as clickable
    for (var i=0; i<len; i++) {

        clickTag = document.createElement('a');

        clickTag.setAttribute('id', i);
        clickTag.setAttribute('href', '#_');
        clickTag.setAttribute('class', 'lightboxLink');

        lightboxImages[i].parentNode.appendChild(clickTag);

        clickTag.appendChild(lightboxImages[i]);

        // Create click event that sends images to lightbox for display 
        clickTag.addEventListener('click', function(event){

            lightboxOpen = true;
            ImageSrc = parseInt(this.getAttribute('id'));
            ImageSend();

            lightbox.setAttribute('class', 'lightbox-open');
            lightboxWrap.style.top = "0vh";

        });
    
    };

    // Check if we're on a screen big enough to warrant a lightbox
    if(window.innerWidth > 840){

        // Lightbox controls 
        
        // Set background <a> tag in lightbox HTML to close lightbox when clicked
        lightboxCloser.addEventListener('click', function(event){

            lightbox.setAttribute('class', 'lightbox');

            setTimeout(function(){
                lightboxWrap.style.top = "-100vh";
            }, 350);

            lightboxOpen = false;
    
        });

        // Keyboard controls
        document.addEventListener('keydown', function(event) {

            // Scroll to next image
            if(event.code == "ArrowRight" && ImageSrc < lightboxImages.length-1 && lightboxOpen == true){
                ImageSrc = ImageSrc + 1;
                ImageSend();
            }

            // Scroll to prev image
            if(event.code == "ArrowLeft" && ImageSrc > 0 && lightboxOpen == true){
                ImageSrc = ImageSrc - 1;
                ImageSend();
            }

            // Close lightbox
            if(event.code == "Escape" && lightboxOpen == true){
                
                lightbox.setAttribute('class', 'lightbox');
                lightboxOpen = false;
                setTimeout(function(){
                    lightboxWrap.style.top = "-100vh";
                }, 350);
              

            }

        });

        function ImageSend(){
                        
            currImage.setAttribute('src', lightboxImages[ImageSrc].getAttribute('src'));
                        
        };

    }

  });

  /* OLD CODE

              lightboxImages[i].addEventListener('click', function(event){
 
                lightbox.setAttribute('class', 'lightbox-open');
                lightboxWrap.style.top = "0vh";
                
                lightboxImage.setAttribute('src', this.getAttribute('src'));

            });

*/