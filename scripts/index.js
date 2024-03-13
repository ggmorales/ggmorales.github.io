$(document).ready(function(){

    /* Main menu clicks handlers */
    $("#aboutme-button").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#about-me").offset().top
        }, 400, "swing", function() {
        });
    });

    $("#projects-button").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#projects").offset().top
        }, 400, "swing", function() {
        });
    });

    result = $.get('https://api.github.com/users/ggmorales/repos', function(response){
        var projects = document.getElementById('projects-cards-container');
        response.forEach(repo => {
            if(repo.name != 'ggmorales.github.io'){
                let newCard = document.createElement('div');
                newCard.className = 'card mb-3 bg-light text-dark';
                newCard.style = "max-width: 540px;"
                
                let cardRow = document.createElement('div');
                cardRow.className = 'row g-0 align-items-center';

                let newCardCol1 = document.createElement('div');
                newCardCol1.className = 'col-md-4 card-image-col'
                let cardImage = document.createElement('img');
                cardImage.className = 'resize-image'
                cardImage.style = "max-width: 70%;"

                image_name = ''
                var request = new XMLHttpRequest();
                request.open("GET", "https://ggmorales.github.io/resources/" + repo.name + ".png", true);
                request.send()
                request.onload = function(){
                    if (request.status == 200){
                        cardImage.src = "./resources/" + repo.name + ".png";
                    } else {
                        image_name = "work_in_progress"
                        cardImage.src = "./resources/" + image_name + ".png";
                    }
                }
                cardImage.className = 'img-fluid card-image';
                cardImage.alt = 'project image';
                newCardCol1.appendChild(cardImage);

                let newCardCol2 = document.createElement('div');
                newCardCol2.className = 'col-md-8';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title text-break'
                cardTitle.innerText = repo.name;
                cardBody.appendChild(cardTitle);

                let cardDesc = document.createElement('p');
                cardDesc.className = 'card-text';
                cardDesc.innerText = repo.description;
                cardBody.appendChild(cardDesc);

                let cardDate = document.createElement('p');
                cardDate.className = 'card-text date-updated-container';
                let date = document.createElement('small');
                date.className = 'text-muted card-updated';
                cardDate.appendChild(date);
                cardBody.appendChild(cardDate);


                let cardButtonContainer = document.createElement('p');
                cardButtonContainer.className = 'card-button-container';
                let cardButton = document.createElement('a');
                cardButton.className = 'btn btn-primary card-button'
                cardButton.innerText = 'See more';
                cardButton.href = repo.html_url;
                cardButton.target = '_blank';
                cardButtonContainer.appendChild(cardButton);
                cardBody.appendChild(cardButtonContainer);

                newCardCol2.appendChild(cardBody);

                cardRow.appendChild(newCardCol1);
                cardRow.appendChild(newCardCol2);

                newCard.appendChild(cardRow);

                projects.appendChild(newCard);
            }
        });
        
    })
});