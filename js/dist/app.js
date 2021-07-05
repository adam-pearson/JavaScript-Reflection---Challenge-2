"use strict";

var randomImage = "https://picsum.photos/".concat(randomNumber(500, 1200), "/").concat(randomNumber(1200, 1500));
var pulledImage = document.getElementById('pulled-image');
var refresh = document.getElementById('refresh');
var emailInput = document.getElementById('assign-email');
var emailButton = document.getElementById('assign-button');
var emailMessage = document.getElementById('email-message');
var assignedList = document.getElementById('assigned-list');
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
  console.log(response);
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
    console.log(response);
    pulledImage.setAttribute('src', response.request.responseURL);
  })["catch"](function (error) {
    // handle error
    console.log(error);
  })["finally"](function () {});
});
/*
    Event listener for the assign email button.
    On click it will loop through the storage
    array, see if the email in the email field
    exists in the array:
    - If it doesn't, push a new object onto the array
    - If it does, push the current image url onto the
    relevant object array value
*/

emailButton.addEventListener('click', function () {
  for (var i = 0; i < storage.length; i++) {}
}); //placeholder - template for my email storage

storage.email0 = {
  email: [url1, url2, url3]
};
storage = [{
  "email@gmail.com": [url1, url2, url3]
}, {
  "mailmail4@gmail.com": [url1, url2, url3]
}, {
  "malemail@gmail.com": [url1, url2, url3]
}, {
  "femalemail@gmail.com": [url1, url2, url3]
}];
storage = [{}, {}, {}];