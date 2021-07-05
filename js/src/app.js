const randomImage = `https://picsum.photos/${randomNumber(500, 1200)}/${randomNumber(1200, 1500)}`;
const pulledImage = document.getElementById('pulled-image');
const refresh = document.getElementById('refresh');
const emailInput = document.getElementById('assign-email');
const emailButton = document.getElementById('assign-button');
const emailMessage = document.getElementById('email-message');
const assignedList = document.getElementById('assigned-list');
let storage = [];

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
const returnedData = axios.get(`${randomImage}`)
    .then(function (response) {
    // handle success
    console.log(response);
    pulledImage.setAttribute('src', response.request.responseURL);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })

/*
    Loads a new image image when the refresh
    overlay is clicked
*/
refresh.addEventListener('click', function() {
    axios.get(`${randomImage}`)
    .then(function (response) {
        console.log(response);
        pulledImage.setAttribute('src', response.request.responseURL);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function() {
    });
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

emailButton.addEventListener('click', function() {
    for (let i = 0; i < storage.length; i++) {

    }
});


//placeholder - template for my email storage

storage.email0 = {email: [url1, url2, url3]}

storage = [
    {
        "email@gmail.com" : [url1, url2, url3]
    },
    {
        "mailmail4@gmail.com" : [url1, url2, url3]
    },
    {
        "malemail@gmail.com" : [url1, url2, url3]
    },
    {
        "femalemail@gmail.com" : [url1, url2, url3]
    }
]

storage = [{},{},{}]