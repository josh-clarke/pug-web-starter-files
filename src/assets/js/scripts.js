// Require for use with browserify
var preventConsoleErrors = require('./plugins/prevent-console-errors');
var objectFitImages = require('object-fit-images/dist/ofi');
var $ = require('jquery/dist/jquery');

preventConsoleErrors();
objectFitImages();

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
