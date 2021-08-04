let randomImage = `https://picsum.photos/500`;
// const pulledImage = document.getElementById('pulled-image');
const pulledImage = document.createElement('img');
const imageDiv = document.getElementById('img-div');
const refresh = document.getElementById('refresh');
const emailInput = document.getElementById('assign-email');
const emailLabel = document.getElementById('email-label');
const emailButton = document.getElementById('assign-button');
const emailMessage = document.getElementById('email-message');
const assignedList = document.getElementById('assigned-list');
const assignedCont = document.getElementById('assigned');
const topLoader = document.getElementById('top-loader-container');
let storage = [];


console.log(pulledImage);

/*
    Reusable function for Axios GET request to pull a random image
    from Picsum
*/

function pullImage() {
    axios.get(randomImage)
    .then(function (response) {
        const picsumID =  response.headers['picsum-id'];
        let currentURL =  `https://picsum.photos/id/${picsumID}/500`;
        imageDiv.insertBefore(pulledImage, refresh);
        pulledImage.setAttribute(`id`, 'pulled-image');
        pulledImage.setAttribute(`class`, 'assigning-image');
        pulledImage.setAttribute(`src`, currentURL);
        pulledImage.setAttribute(`alt`, 'Randomly Pulled Image');
        topLoader.classList.add('loading');
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function(response) {
        topLoader.classList.remove('loading');
    });
}

pullImage();


/*
    Shows the loading animation, and then
    loads a new image image when the refresh
    overlay is clicked. Removes the loading
    animation once everything has finished
*/
refresh.addEventListener('click', function() {
    topLoader.classList.add('loading');
    pullImage();
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
    let emails = "";

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if (!validateEmail(grabbedEmail)) {
        emailMessage.classList.add('shown');
        emailInput.classList.add('error');
        emailLabel.classList.add('error');
    } else if (validateEmail(grabbedEmail)) {
        emailMessage.classList.remove('shown');
        emailInput.classList.remove('error');
        emailLabel.classList.remove('error');

        if (storage.length === 0) {
            storage.push({
                "email" : grabbedEmail,
                "urls" : [`<a href="${pulledImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}"></a>`]
            });
        } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes(`<a href="${pulledImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}"></a>`)) {
            storage[indexOfEmail].urls.push(`<a href="${pulledImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}"></a>`);
        } else if (indexOfEmail === -1) {
            storage.push({
                "email" : grabbedEmail,
                "urls" : [`<a href="${pulledImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}"></a>`]
                
            });
        }

        if (storage.length !== 0) {
            for (let i = 0; i < storage.length; i++) {
                emails += `<ul class="assigned-list">
        <li class="assigned-main-list">
            <ul class="email-heading">
                <h3>${storage[i].email}</h3>
                <i class="fas fa-chevron-down"></i>
                <i class="fas fa-chevron-up"></i>
            </ul>
            <ul>
                <li class="assigned-sub-list">
                    ${storage[i].urls.join("")}
                </li>
            </ul>
        </li>
    </ul>`;
            }
        }
        
        $('#assigned').html(emails);

        (function assignButtons() {
            let buttons = document.getElementsByClassName('email-heading');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function(e) {
                    this.classList.toggle("active");
                    this.nextElementSibling.children[0].classList.toggle("active");
                    this.querySelector('.fa-chevron-down').classList.toggle('toggled');
                    this.querySelector('.fa-chevron-up').classList.toggle('toggled');
                });
            }
        })();

        topLoader.classList.add('loading');
        pullImage();
    }
});

