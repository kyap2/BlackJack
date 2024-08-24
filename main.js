var dealerSum = 0; //Total point value for point players
var youSum = 0;

var dealerAceCount = 0; //Keeps track of how many Aces both the dealer and I have
var yourAceCount = 0;

var hidden; //Keeps track of hidden card of dealer 
var deck; //Keeps track of your deck, and without storing a value it is flexible of what goes inside

var canHit = true; //allows the player to draw while yourSum <= 21

window.onload = function() { //.onload is an event handler that ensures the page is loaded before any buttons are clicked
    buildDeck(); //Calling funcitons 
    shuffleDeck();
    startGame();
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
}

//Determing the value of the cards
function getValue(card) {
    let data = card.split("-"); //"4-C" -> ["4". "C"] Splits value in 2 parts
    let value = data[0];

    if (isNaN(value)) { //A J Q K values 
        if(value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value); //if the number is not a the Letters, it will just return a number
}