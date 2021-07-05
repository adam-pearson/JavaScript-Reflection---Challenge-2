const randomImage = `https://picsum.photos/${randomNumber(500, 1200)}/${randomNumber(1200, 1500)}`;
const pulledImage = document.getElementById('pulled-image');
const refresh = document.getElementById('refresh');
const emailInput = document.getElementById('assign-email');
const emailButton = document.getElementById('assign-button');
const emailMessage = document.getElementById('email-message');
const assignedList = document.getElementById('assigned-list');
const assignedCont = document.getElementById('assigned');
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
    pulledImage.setAttribute('src', response.request.responseURL);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    });

/*
    Loads a new image image when the refresh
    overlay is clicked
*/
refresh.addEventListener('click', function() {
    axios.get(`${randomImage}`)
    .then(function (response) {
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
    On click it will check if the storage array
    has any contents. If not, it creates a new object.
    - If it does, it checks if the email exists and if the url exists inside it,
    and pushes to its urls array if applicable.
    - If the email does not exist, it creates a new object.
*/

emailButton.addEventListener('click', function() {
    const grabbedEmail = emailInput.value;
    const indexOfEmail = storage.findIndex(i => i.email === grabbedEmail);
    let emails = `<ul id="assigned-list" class="assigned-list">`;
    
    if (storage.length === 0) {
        storage.push({
            "email" : grabbedEmail,
            "urls" : [pulledImage.getAttribute('src')]
        });
    } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes(pulledImage.getAttribute('src'))) {
        storage[indexOfEmail].urls.push(pulledImage.getAttribute('src'));
    } else if (indexOfEmail === -1) {
        storage.push({
            "email" : grabbedEmail,
            "urls" : [pulledImage.getAttribute('src')]
        });
    }

    if (storage.length !== 0) {
        for (let i = 0; i < storage.length; i++) {
            emails += `
            <li class="assigned-main-list">
                <h3>${storage[i].email}</h3>
                <i class="fas fa-chevron-down"></i>
                <li class="assigned-sub-list">
                </li>
            </li>
            `;
        }
        console.log(emails + "</ul>");
    }
    assigned.innerHTML = emails + "</ul>";

    /*
        To do: 
        - Remove active class when another tab is pressed
        - Create the loop to loop through the images and append
        - When a tab is clicked, show the images
        - Add email validation
        - Document code a little better
    */
    (function assignButtons() {
        let buttons = document.getElementsByClassName('assigned-main-list');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(e) {
                buttons[i].classList.toggle("active");
            });
        }
    })();
});
