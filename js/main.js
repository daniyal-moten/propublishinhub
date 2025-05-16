(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    // GPT CROUSEL
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const slideWidth = 100; // 100%
        
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Initialize the carousel
        function initCarousel() {
          // Set initial position
          updateCarousel();
          
          // Start auto-sliding
          startAutoSlide();
          
          // Add event listeners to dots
          dots.forEach(dot => {
            dot.addEventListener('click', function() {
              currentIndex = parseInt(this.getAttribute('data-index'));
              updateCarousel();
              resetAutoSlide();
            });
          });
          
          // Add touch/swipe support
          let startX, endX;
          carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
          });
          
          carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
          });
          
          function handleSwipe() {
            const threshold = 50; // Minimum distance to be considered a swipe
            if (startX - endX > threshold) {
              // Swipe left, go to next slide
              nextSlide();
            } else if (endX - startX > threshold) {
              // Swipe right, go to previous slide
              prevSlide();
            }
          }
        }
        
        // Update carousel position and active dot
        function updateCarousel() {
          carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
          
          // Update active dot
          dots.forEach((dot, index) => {
            if (index === currentIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
        
        // Go to next slide
        function nextSlide() {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
          resetAutoSlide();
        }
        
        // Go to previous slide
        function prevSlide() {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          updateCarousel();
          resetAutoSlide();
        }
        
        // Start auto-sliding
        function startAutoSlide() {
          autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        // Reset auto-slide timer
        function resetAutoSlide() {
          clearInterval(autoSlideInterval);
          startAutoSlide();
        }
        
        // Initialize the carousel
        initCarousel();
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowRight') {
            nextSlide();
          } else if (e.key === 'ArrowLeft') {
            prevSlide();
          }
        });
        
        // Pause auto-sliding when user hovers over the carousel
        carousel.addEventListener('mouseenter', function() {
          clearInterval(autoSlideInterval);
        });
        
        // Resume auto-sliding when user leaves the carousel
        carousel.addEventListener('mouseleave', function() {
          startAutoSlide();
        });
      });
    //end
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
document.addEventListener("DOMContentLoaded", function() {
  // Target the main card and its children
  const journeyCard = document.querySelector('.manuscript-journey-card');
  const steps = document.querySelector('.manuscript-steps');
  const stepsContent = document.querySelector('.manuscript-steps-content');
  const stepItems = document.querySelectorAll('.manuscript-steps .list-group-item');

  function animateSection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        journeyCard.classList.add('animate-in');
        steps.classList.add('animate-in');
        stepsContent.classList.add('animate-in');
        stepItems.forEach((item, idx) => {
          item.classList.add('animate-in');
          item.style.setProperty('--delay', (0.2 + idx * 0.1) + 's');
        });
        observer.disconnect();
      }
    });
  }
  function activateTab(tabId) {
    const tabTrigger = new bootstrap.Tab(document.getElementById(tabId));
    tabTrigger.show();
    // Optional: Scroll into view
    document.getElementById(tabId.replace('-tab', '')).scrollIntoView({ behavior: 'smooth' });
  }

  if (journeyCard) {
    const observer = new IntersectionObserver(animateSection, {
      threshold: 0.2
    });
    observer.observe(journeyCard);
  }
});

})(jQuery);