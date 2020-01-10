// Primitive Lightbox 

// vars
ImageSrc = 0;
lightboxOpen = false;
lightboxReady = false;


document.addEventListener('DOMContentLoaded', function(){


    // Init  
    const lightbox = document.querySelector('[id="lightbox"]');
    const lightboxWrap = document.querySelector('[id="lightbox-wrapper"]');
    const lightboxCloser = document.querySelector('[id="lightbox-close"]');
    const gotoPrev = document.querySelector('[id="gotoPrev"]');
    const gotoNext = document.querySelector('[id="gotoNext"]'); 
    const currImage = document.querySelector('[id="lightbox-image"]');

    // Grab images in the post that we could lightbox
    var imageScour = document.querySelectorAll('[class^="wp-image"]');
    const lightboxImages = Object.values(imageScour);
    len = imageScour.length;

    // ==================================
    //  Set up clicktags on images
    // ==================================

    // Check if we're on a screen big enough to warrant a lightbox
    if(window.innerWidth > 840){

        // Lightbox on and off master functions

        function disableScroll() { 
            // Get the current page scroll position 
            scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
          
                // If any scroll is attempted, set this to the previous value 
                window.onscroll = function() { 
                    window.scrollTo(scrollLeft, scrollTop); 
                }; 
        } 
          
        function enableScroll() { 
            window.onscroll = function() {}; 
        } 
        
        function closeLightbox() {
            lightbox.setAttribute('class', 'lightbox');
            currImage.setAttribute('class', 'lightbox-image');
            setTimeout(function(){lightboxWrap.style.display = "none";}, 250);
            
            lightboxReady = false;
            lightboxOpen = false;
            
            enableScroll();
        }

        function openLightbox() {

            lightboxWrap.style.display = "block";
            setTimeout(function(){
                lightbox.setAttribute('class', 'lightbox-open');
                ImageSend();
            }, 1);

            gotoNext.focus();
            lightboxOpen = true; 

            disableScroll();
            
        }

        for (var i=0; i<len; i++) {

            // Make the clicktags and attach them to clickable
            clickTag = document.createElement('a');
    
            clickTag.setAttribute('id', i);
            clickTag.setAttribute('href', '#_');
            clickTag.setAttribute('class', 'lightboxLink');
    
            lightboxImages[i].parentNode.appendChild(clickTag);
    
            clickTag.appendChild(lightboxImages[i]);
    
            // Create click event that sends images to lightbox for display 
            clickTag.addEventListener('click', function(event){

                ImageSrc = parseInt(this.getAttribute('id'));
                openLightbox();
    
            });
        
        };
        
        // ==============================
        //  Lightbox controls 
        // ==============================

        // <a> tag that goes to next image on page 
        gotoNext.addEventListener('click', function(event){
            if(ImageSrc < lightboxImages.length-1 && lightboxReady == true){
                this.style = "";
                ImageSrc = ImageSrc + 1;
                lightboxReady = false; 
                currImage.setAttribute('class', 'lightbox-prev-image');
                currImage.ontransitionend = function(event){
                    setTimeout(function(){ gotoNextImage(); }, 0);
                }    
            }
        });

        // <a> tag that goes to previous image on page 
        gotoPrev.addEventListener('click', function(event){
            if(ImageSrc > 0 && lightboxReady == true){
                ImageSrc = ImageSrc - 1;
                lightboxReady = false; 
                currImage.setAttribute('class', 'lightbox-next-image');
                currImage.ontransitionend = function(){
                    setTimeout(function(){ gotoPrevImage(); }, 0);
                }              
            }
        });

        // Set background <a> tag in lightbox HTML to close lightbox when clicked
        lightboxCloser.addEventListener('click', function(event){

            closeLightbox();

        });

        // Keyboard controls
        document.addEventListener('keydown', function(event) {


            if(lightboxOpen == true){
                // Scroll to next image
                if(event.code == "ArrowRight" && ImageSrc < lightboxImages.length-1 && lightboxReady == true){
                    ImageSrc = ImageSrc + 1;
                    lightboxReady = false; 
                    currImage.setAttribute('class', 'lightbox-prev-image');
                    currImage.ontransitionend = function(event){
                        setTimeout(function(){ gotoNextImage(); }, 0);
                    } 
                }

                // Scroll to prev image
                if(event.code == "ArrowLeft" && ImageSrc > 0 && lightboxReady == true){
                    ImageSrc = ImageSrc - 1;
                    lightboxReady = false;  
                    currImage.setAttribute('class', 'lightbox-next-image');
                    currImage.ontransitionend = function(){
                        setTimeout(function(){ gotoPrevImage(); }, 0);
                    }
                }

                // Close lightbox
                if(event.code == "Escape" ){

                    closeLightbox();
                
                }

                // Crude focus trapping 
                if(event.code == "Tab"){

                    if(document.activeElement != gotoPrev || document.activeElement != gotoNext){
                        event.preventDefault();
                    }


                    if(ImageSrc == lightboxImages.length-1){
                        gotoPrev.focus();
                    }else{
                        gotoNext.focus();
                    }

                    console.log(document.activeElement)

                }
            }


        });

        // ==============================
        //  Image Functions 
        // ==============================

        // Send clicked image to lightbox
        function ImageSend(){

            if(lightboxOpen == true){
                currImage.setAttribute('src', lightboxImages[ImageSrc].getAttribute('src'));
                currImage.setAttribute('class', 'lightbox-image-open'); 
                
                // Here we hide the prev and next buttons in case there are no more images to display on either side
                if(ImageSrc == lightboxImages.length-1){
                    gotoNext.style.display = "none";
                }else{
                    gotoNext.style = "";
                }     
                
                if(ImageSrc == 0){
                    gotoPrev.style.display = "none";
                }else{
                    gotoPrev.style = "";
                }
                
                lightboxReady = true;  
            }

        };

        // Go to previous image in lightboxImages array
        function gotoPrevImage(){
            currImage.setAttribute('class', 'lightbox-prev-image');
            currImage.ontransitionend = function(event){
                setTimeout(function(){ ImageSend(); }, 0);
            }            
        };

        // Go to next image in lightboxImages array
        function gotoNextImage(){
            currImage.setAttribute('class', 'lightbox-next-image');
            currImage.ontransitionend = function(event){
                setTimeout(function(){ ImageSend(); }, 0);
            }
        };

    };

  });
