// Primitive Lightbox 

// vars
ImageSrc = 0;
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
    
                disableScroll();

                lightboxReady = true;
                ImageSrc = parseInt(this.getAttribute('id'));
                ImageSend();
    
                lightbox.setAttribute('class', 'lightbox-open');
                lightboxWrap.style.top = "0vh";
    
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

            lightbox.setAttribute('class', 'lightbox');
            currImage.setAttribute('class', 'lightbox-image');
            setTimeout(function(){lightboxWrap.style.top = "-100vh";}, 350);
            lightboxReady = false;
            enableScroll();

        });

        // Keyboard controls
        document.addEventListener('keydown', function(event) {

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
            if(event.code == "Escape" && lightboxReady == true){

                lightbox.setAttribute('class', 'lightbox');
                currImage.setAttribute('class', 'lightbox-image');
                setTimeout(function(){ lightboxWrap.style.top = "-100vh"; }, 350);
                lightboxReady = false;
                enableScroll();
            
            }

        });

        // ==============================
        //  Image Functions 
        // ==============================

        // Send clicked image to lightbox
        function ImageSend(){
            currImage.setAttribute('src', lightboxImages[ImageSrc].getAttribute('src'));
            currImage.setAttribute('class', 'lightbox-image-open'); 
            
            // Here we hide the prev and next buttons in case there are no more images to display on either side
            if(ImageSrc < lightboxImages.length-1){
                gotoNext.style = "";
            }else{
                gotoNext.style.display = "none";
            }     
            
            if(ImageSrc > 0){
                gotoPrev.style = "";
            }else{
                gotoPrev.style.display = "none";
            }
            
            lightboxReady = true;  
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
