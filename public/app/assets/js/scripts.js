



/*=====================================================
Google MAp
========================================================
*/

var placeSearch, autocomplete;
      function initMap() {
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        var location1 = "<b>Location: </b>"+ place.formatted_address + "<br/>";
        location1 += "<b>Latitude: </b>"+ place.geometry.location.lat() + "</br>";
        location1 += "<b>Longitude: </b>" + place.geometry.location.lng() + "<br/>";
        document.getElementById('location1').innerHTML = location1;
      }

      
      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(geolocation.lat + " -- " + geolocation.lng);
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }










/*=====================================================
Scroll Property
========================================================
*/
//variables
var top_bar = $('.header-top-barr');
var scrolltop = $('.scroll-top');

$(window).scroll(function(){
  // Sticky header
  if(window.scrollY > 10){
      top_bar.addClass("attach");

  }else{
      top_bar.removeClass("attach");
  }

  // scroll top
  if(window.scrollY > 300){
      scrolltop.addClass("show");
  }else{
      scrolltop.removeClass("show");
  }

});


/*=====================================================
full screen header
========================================================
*/

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
