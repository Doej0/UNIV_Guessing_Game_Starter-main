/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".
*/

function generateWinningNumber() {
    let randomNum = Math.floor(Math.random() * 100) + 1;
    return randomNum;
}
generateWinningNumber();

function shuffle(arr) {
    let m = arr.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
}

function newGame() {
    const game_object = {
        playersGuess: null,
        pastGuesses: [],
        winningNumber: generateWinningNumber(),
        guessNumber: 0,

        difference: function () {
            return Math.abs(this.playersGuess - this.winningNumber);
        },

        isLower: function () {
            return (this.playersGuess < this.winningNumber);
        },

        playersGuessSubmission: function (number) {
            this.playersGuess = number;
            if (number < 1 || number > 100 || isNaN(number)) {
                clearPastGuessSlot(game);
                throw 'That is an invalid guess.';
            }
            this.guessNumber++;
            return this.checkGuess();
        },

        checkGuess: function () {
            let str = "";
            if (this.playersGuess == this.winningNumber) {
                return "You Win!";
            }
            if (this.pastGuesses.indexOf(this.playersGuess) != -1) {
                this.guessNumber--;
                return "You have already guessed that number."
            }
            if (this.playersGuess != this.winningNumber || this.pastGuesses.indexOf(this.playersGuess) == -1) {
                this.pastGuesses.push(this.playersGuess);
            }
            if (this.guessNumber == 5) {
                return "You Lose.";
            }
            if (this.difference() < 10) {
                return "You\'re burning up!";
            }
            if (this.difference() < 25) {
                return "You\'re lukewarm.";
            }
            if (this.difference() < 50) {
                return "You\'re a bit chilly.";
            }
            if (this.difference() < 100) {
                return "You\'re ice cold!";
            }
            return str;
        },

        provideHint: function () {
            let arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
            shuffle(arr);
            return arr;
        }

    }

    return game_object;
}


/**
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
 */

function addGuess(game) {
    const item1 = document.getElementsByClassName("guess-card")[game.guessNumber];
    item1.innerHTML = document.getElementById("players-guess").value;

    document.getElementById("status").innerHTML = game.playersGuessSubmission(item1.innerHTML);
    document.getElementById("players-guess").value = "";
}

function clearPastGuessSlot(game)
{
    const item1 = document.getElementsByClassName("guess-card")[game.guessNumber];
    item1.innerHTML = "";
    document.getElementById("players-guess").value = "";
}

function guessingGame() {
    game = newGame();
    const el = document.getElementById("submit");
    el.addEventListener("click", () => { addGuess(game);  
        
    }, false);
}

const goman = document.getElementById("reset");
goman.addEventListener("click", () => { location.reload(); }, false);
