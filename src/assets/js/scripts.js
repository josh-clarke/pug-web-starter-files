//=require plugins/prevent-console-errors.js
//=require ../../../node_modules/jquery/dist/jquery.js

$(function() {

  //Breakpoint Checker
  //source: https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript

  var breakpoint = {};
  breakpoint.refreshValue = function() {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  };

  $(window).resize(function() {
    breakpoint.refreshValue();
    // Do other things on breakpoint refresh here
  }).resize();

  $(p).text += 'Test'

});
