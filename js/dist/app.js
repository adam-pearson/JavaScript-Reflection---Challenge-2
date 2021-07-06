"use strict";

var randomImage = "https://picsum.photos/".concat(randomNumber(500, 1200), "/").concat(randomNumber(1200, 1500));
var pulledImage = document.getElementById('pulled-image');
var refresh = document.getElementById('refresh');
var emailInput = document.getElementById('assign-email');
var emailButton = document.getElementById('assign-button');
var emailMessage = document.getElementById('email-message');
var assignedList = document.getElementById('assigned-list');
var assignedCont = document.getElementById('assigned');
var storage = [];
/* 
    Gets a random number to use as the
    width & height for the Picsum API
*/

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
    Axios GET request to pull a random image
    from Picsum
*/


var returnedData = axios.get("".concat(randomImage)).then(function (response) {
  // handle success
  pulledImage.setAttribute('src', response.request.responseURL);
})["catch"](function (error) {
  // handle error
  console.log(error);
});
/*
    Loads a new image image when the refresh
    overlay is clicked
*/

refresh.addEventListener('click', function () {
  axios.get("".concat(randomImage)).then(function (response) {
    pulledImage.setAttribute('src', response.request.responseURL);
  })["catch"](function (error) {
    // handle error
    console.log(error);
  })["finally"](function () {});
});
/*
    Event listener for the assign email button.
    On click it will check if the storage array
    has any contents. If not, it creates a new object.
    - If it does, it checks if the email exists and if the url exists inside it,
    and pushes to its urls array if applicable.
    - If the email does not exist, it creates a new object.
*/

emailButton.addEventListener('click', function () {
  var grabbedEmail = emailInput.value;
  var indexOfEmail = storage.findIndex(function (i) {
    return i.email === grabbedEmail;
  });
  var emails = "";

  if (storage.length === 0) {
    storage.push({
      "email": grabbedEmail,
      "urls": ["<img class=\"assigned-sub-image\" src=\"".concat(pulledImage.getAttribute('src'), "\">")]
    });
  } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes("<img class=\"assigned-sub-image\" src=\"".concat(pulledImage.getAttribute('src'), "\">"))) {
    storage[indexOfEmail].urls.push("<img class=\"assigned-sub-image\" src=\"".concat(pulledImage.getAttribute('src'), "\">"));
  } else if (indexOfEmail === -1) {
    storage.push({
      "email": grabbedEmail,
      "urls": ["<img class=\"assigned-sub-image\" src=\"".concat(pulledImage.getAttribute('src'), "\">")]
    });
  }

  console.log(storage);

  if (storage.length !== 0) {
    for (var i = 0; i < storage.length; i++) {
      emails += "\n<ul class=\"assigned-list\">\n    <li class=\"assigned-main-list\">\n        <ul class=\"email-heading\">\n            <h3>".concat(storage[i].email, "</h3>\n            <i class=\"fas fa-chevron-down\"></i>\n        </ul>\n        <ul>\n            <li class=\"assigned-sub-list\">\n                ").concat(storage[i].urls.join(""), "\n            </li>\n        </ul>\n    </li>\n</ul>\n            ");
    }
  }

  console.log(emails);
  $('#assigned').html(emails);
  /*
      To do: 
      - Remove active class when another tab is pressed
      * Create the loop to loop through the images and append
      * When a tab is clicked, show the images
      - Add email validation
      - Document code a little better
      - Refactor the assignButtons function
      - Fix the randomizer
  */

  (function assignButtons() {
    var buttons = document.getElementsByClassName('email-heading');

    var _loop = function _loop(_i) {
      buttons[_i].addEventListener('click', function (e) {
        buttons[_i].classList.toggle("active");

        buttons[_i].nextElementSibling.children[0].classList.toggle("active");
      });
    };

    for (var _i = 0; _i < buttons.length; _i++) {
      _loop(_i);
    }
  })();
});