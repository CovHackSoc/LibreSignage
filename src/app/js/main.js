var $ = require('jquery');
var APIInterface = require('ls-api').APIInterface;
var APIUI = require('ls-api-ui');
var DisplayView = require('./displayview.js').DisplayView;
var util = require('ls-util');

$(document).ready(async () => {
  let API = new APIInterface({standalone: false});
  try {
    await API.init();
  } catch(e) {
    if (!('noui' in util.get_GET_parameters())) {
      APIUI.handle_error(e);
      return;
    } else {
      console.error(e.message);
    }
  }
  var countDownDate = new Date("Mar 17, 2019 12:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    var elements = document.getElementsByClassName("countdown");
    for (let i = 0; i < elements.length; i++) {
      if (distance < 0) {
        clearInterval(x);
        elements[i].innerHTML = "Hacking is over!";
      } else {
        elements[i].innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
    }
  }, 100);

  var y = setInterval(function() {

    // Get todays date and time
    var now = new Date();

    // Display the result in the element with id="demo"
    var elements = document.getElementsByClassName("now");
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = now.toLocaleDateString('en-US', {weekday: 'long', hour: '2-digit', second: '2-digit', 'minute': '2-digit'} )
    }
  }, 100);




  let view = new DisplayView(API);
  await view.init();
});
