(function( $ ) { 
/**
 * START - ONLOAD - JS
 * 1. Set Height Block Banner
 */
/* ----------------------------------------------- */
/* ------------- FrontEnd Functions -------------- */
/* ----------------------------------------------- */

/**
 * 1. Set Height Block Banner
 */
function setHeightBanner() {
    if(!$('.header-wrap .blk-banner').length) { return; }

    var w_height = $(window).height();
    $('.header-wrap .blk-banner').css('height', w_height);
    $('.header-wrap .banner-img').css('height', w_height);

    $( window ).resize(
        $.debounce(300, function(e){
            var w_height = $(window).height();
            $('.header-wrap .blk-banner').css('height', w_height);
            $('.header-wrap .banner-img').css('height', w_height);
        })
    );
}
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* OnLoad Page */
$(document).ready(function($){
    // 1. 
    setHeightBanner();
});
/* OnLoad Window */
var init = function () {   

};
window.onload = init;
})(jQuery);