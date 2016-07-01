var admin_menu = $('.navbar-side');
var admin_menu = $('.admin-menu-wrapper');
var overlay    = $('.overlay-wrapper');


function header_property() {
  $window_height = $(window).height(),
  $('.headers-wrapper').css('height',$window_height);
  }
$(window).on('resize', function(){
    header_property();
});
$(document).ready(function(){
    header_property();
});

/*******************************************************
========================================================
After document is ready ********************************
========================================================
********************************************************
*/

$(document).ready(function() {

  $(".admin-menu-toggle").on("click", function(){
    if( admin_menu.hasClass("show") ){
      admin_menu.removeClass("show");
      overlay.removeClass("show");
    }else{
      admin_menu.addClass("show");
      overlay.addClass("show");
    }
  });


/*=====================================================
Parallax Effects
========================================================
*/
  // Wow Parallax
  new WOW().init();

/*=====================================================
MorphextWW
========================================================
*/
  $(".rotate-text").Morphext({
      animation: "bounceInUp",
      separator: ",",
      speed: 3000,
      complete: function () {
          // Called after the entrance animation is executed.
      }
  });

/*=====================================================
Scroll Property
========================================================
*/
  //smooth scroll
  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 600, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutQuint', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    callback: function ( toggle, anchor ) {} // Function to run after scrolling
  });
  // Nice scroll
  $("html, .side-menu").niceScroll({
    scrollspeed: 40,
    mousescrollstep: 50,
    smoothscroll: true,
    cursorwidth: "10px",
    cursorborderradius: "5px",
    cursorborder: "none",
    zindex: "9999"
  });



});
