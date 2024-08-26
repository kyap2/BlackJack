var dealerSum = 0; //Total point value for point players
var yourSum = 0;

var dealerAceCount = 0; //Keeps track of how many Aces both the dealer and I have
var yourAceCount = 0;

var hidden; //Keeps track of hidden card of dealer 
var deck; //Keeps track of your deck, and without storing a value it is flexible of what goes inside

var canHit = true; //allows the player to draw while yourSum <= 21

window.onload = function() { //.onload is an event handler that ensures the page is loaded before any buttons are clicked
    buildDeck(); //Calling funcitons 
    shuffleDeck();
    startGame();


//Makes sound effect when button "Hit" is clicked
    document.getElementById("hit").addEventListener("click", function() {
        document.getElementById("hitsound").play();
    });

    document.getElementById("stay").addEventListener("click", function() {
        document.getElementById("hitsound").play();
    });
    //replays the game
    document.getElementById("replay").addEventListener("click", replayGame);


}
//Setting up cards, arrays, buidling decks and shuffling them to be random using the buildDeck() function
function buildDeck() { //function for the deck of cards
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; //array for card values
    let types = ["C", "D", "H", "S"]; //array for card types
    deck = []; //this is where the cards will be stored

    //Nested forloop that goes through each value of values and types
    for (let i = 0; i < types.length; i++) { //nested for loop goes over each value for the current type
        for (let j = 0; j < values.length; j++) { //nested for loop that goes over each value for suits
            deck.push(values[j] + "-" + types[i]); //Goes through every possibe comibination, creates a card string by combining the current value and suit and adds to it to the deck array
        }
    }
   
}

//Shuffles the deck 
function shuffleDeck() { //function to shuffle through deck, rather than having the cards be the same
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); //(0-1) * 52 => (0-51.9999)
        let temp = deck[i]; //swamps different position
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

//Game logic, it being actually played
function startGame() { //function to start the game
    hidden = deck.pop() //removes card at the end of the array
    dealerSum += getValue(hidden); //pass the value to hidden
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);

    //For the dealer's hand of card
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    console.log(dealerSum);

    //Players cards 
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

//Allow player to hit
function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21) { //A, J, K -> 11 + 10 + 10
        canHit = false;
    }

}
    //Stay button
    function stay() {
        dealerSum = reduceAce(dealerSum, dealerAceCount);
        yourSum = reduceAce(yourSum, yourAceCount);

        canHit = false; //Does not let let use Hit after staying
        document.getElementById("hidden").src = "./cards/" + hidden + ".png"; //Reveals hidden card
        
        //Win condition
        let message = "" //Message variable, which is empty
        if (yourSum > 21) { //If your cards are less than 21
            message = "You Lose!";
        }
        else if (dealerSum > 21) { //If dealer cards is less than 21
            message = "You win!";
        }
        else if (yourSum == dealerSum) { //If your cards are equal to dealer cards
            message = "Tie!";
        }
        else if (yourSum > dealerSum) { //if your cards are greater than dealer
            message = "You Win!";
        }
        else if (yourSum < dealerSum) { //If your are cards lower than dealer cards
            message = "You Lose!";
        }

        //Displays the Score
        document.getElementById("dealer-sum").innerText = dealerSum;
        document.getElementById("your-sum").innerText = yourSum;
    
        document.getElementById("results").innerText = message;
    }
//Determing the point value of the cards; kinda like score
function getValue(card)  { //parameter =(card)
    let data = card.split("-"); //"4-C" -> ["4". "C"] Splits value in 2 parts
    let value = data[0];

    //if statement that checks if the value of the card is Not A Number = NaN
    if (isNaN(value)) { //A J Q K values and Nan = Not a Number(with a parameter of value)
        if(value == "A") { //Checks if it is an Ace, returns 11
            return 11;
        }
        return 10; //If it is not an Ace, then it returns 10, bc of value for J, Q, K
    }
    //value goes through parseInt function to conver the "4" -> 4, from string to integer
    return parseInt(value); //if the number is not a the Letters, it will just return a number,
}

//Checks Ace card, if it is an A
function checkAce(card) {
    if(card[0] == "A") {
        return 1;
    } else {
        return 0;
    }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


//Reset button for game
function replayGame() {
    dealerSum = 0; //Resets all variables to 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    hidden = null;
    canHit = true;
   
    //clear card images
    document.getElementById("dealer-cards").innerText = "";
    document.getElementById("your-cards").innerText = "";
    
    //resets message
    document.getElementById("results").innerText = "";
    

    startGame();
}
//when click replay it replays the game

