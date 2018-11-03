/*
 * A list that holds all of your cards
 */
const symbols = ["fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const icons = symbols.concat(symbols);

const cardsContainer = document.querySelector(".deck");
const popup = document.querySelector('.popup');

let openedCards = [];
let matchedCards = [];



/*
*Shuffles the cards
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
*Starts the game
*/
function startGame() {
	for (let i = 0; i < icons.length; i++) {
		let openedCards = [];
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${icons[i]}"></i>`; 
		cardsContainer.appendChild(card);

		click(card);
	}
}

/*
*Click Event
*/
function click(card) {
	card.addEventListener("click", function() {
		const currentCard = this;
		const previousCard = openedCards[0];

	//Existing opened card
		if(openedCards.length === 1) {
			card.classList.add("open", "show", "disable");

			openedCards.push(this);
 			compare(currentCard, previousCard);

		} else if(openedCards.length === 0) {
			card.classList.add("open", "show", "disable");
			openedCards.push(this);
		}
	});	
}

/*
*Compares the cards
*/
function compare(currentCard, previousCard) {
	if(currentCard.innerHTML === previousCard.innerHTML) {
		currentCard.classList.add("match");
		previousCard.classList.add("match");

		matchedCards.push(currentCard, previousCard);
				
		openedCards = [];
		addMove();
		isOver();

	} else {

		setTimeout(function () {
			currentCard.classList.remove("open", "show", "disable");
			previousCard.classList.remove("open", "show", "disable");
			openedCards = [];
			addMove();
			}, 500);	
	}
}

/*
*Add Move
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;
	if (moves === 1) {
		startTimer();
	}

	//Sets the rating
	rating();
}

/*
*Game Rating
*/
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating() {
	switch(moves) {
		case 18:
			starsContainer.innerHTML = star + star;
		break;

		case 25:
			starsContainer.innerHTML = star;
		break;
	}
}

/*
*Timer
*/
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = "00";
    totalMinutes = "00";

// Set the default value to the timer's container
timerContainer.innerHTML = totalMinutes + ":"+ totalSeconds

 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
        //Increase minutes when seconds equal 60
        if(totalSeconds === 60) {
          totalMinutes++;
          totalSeconds = 0;
          totalSeconds++;
          // Update the HTML Container with the new time
          timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
        }
        //stop timer when there are 8 matched pairs
        if(matchedCards.length === icons.length) {
          stopTimer();
          isOver();
        }

    }, 1000);
}

/*
*Check if game is over
*/
function isOver() {
	if(matchedCards.length === icons.length) {
		stopTimer();
		popup.classList.remove("hide");
  document.querySelector('.final-moves').innerHTML = document.querySelector('.moves').innerHTML;
  document.querySelector('.final-time').innerHTML = document.querySelector('.timer').innerHTML;
  document.querySelector('.final-star').innerHTML = document.querySelector('.stars').innerHTML;
  		}
	}

/*
* Close popup
*/
function closePopup() {
	popup.classList.add("hide");
	reset();
}

//reset timer
function resetTimer() {
  timerContainer.innerHTML = "00:00";
}

/*
* Stop Timer
*/
function stopTimer() {
    clearInterval(liveTimer);
}

/*
*Restarts the Game via the button on the popup
*/
function reset() {
	cardsContainer.innerHTML = "";

	//Call startGame to create new cards
	startGame();
	
	//Reset any related variables like matchedCards
	matchedCards = [];
	openedCards = [];

	moves = 0;
	movesContainer.innerHTML = 0;

	starsContainer.innerHTML = star + star + star;

	resetTimer();
	stopTimer();

	shuffle(icons);
}
/*
*Resets the Game via the restart button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", reset);

//start the game for the first time
shuffle(icons);
startGame();


