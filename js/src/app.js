const randomImage = `https://picsum.photos/500/1200`;
const pulledImage = document.getElementById('pulled-image');
const refresh = document.getElementById('refresh');
const emailInput = document.getElementById('assign-email');
const emailLabel = document.getElementById('email-label');
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
const returnedData = axios.get(randomImage)
    .then(function (response) {
    // handle success
    const configImage = response.request.responseURL;
    pulledImage.setAttribute('src', configImage);
    pulledImage.setAttribute("data-object-fit", "cover");
    console.log(response);
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
        const configImage = response.request.responseURL;
        pulledImage.setAttribute('src', configImage);
        pulledImage.setAttribute("data-object-fit", "cover");
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
                "urls" : [`<img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}" data-object-fit="cover">`]
            });
        } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes(`<img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}" data-object-fit="cover">`)) {
            storage[indexOfEmail].urls.push(`<img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}" data-object-fit="cover">`);
        } else if (indexOfEmail === -1) {
            storage.push({
                "email" : grabbedEmail,
                "urls" : [`<img class="assigned-sub-image" src="${pulledImage.getAttribute('src')}" data-object-fit="cover">`]
                
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

        axios.get(`${randomImage}`)
        .then(function (response) {
            const configImage = response.request.responseURL;
            pulledImage.setAttribute('src', configImage);
            pulledImage.setAttribute("data-object-fit", "cover");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
        });
    }
});

