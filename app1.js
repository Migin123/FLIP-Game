const cards = document.querySelectorAll(".card");
console.log(cards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;  // To track the number of matched pairs

function flip() {
    if (lockBoard || this === firstCard) return;
    console.log("card flipped");
    console.log(this);

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;

    if (isMatch) {
        success();
    } else {
        fail();
    }
}

function success() {
    console.log("Match found!");
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    matchedPairs++;

    // Check if all pairs are matched
    if (matchedPairs === cards.length / 2) {
        setTimeout(showWinMessage, 500);  // Show win message with a short delay
    }
    
    reset();
}

function fail() {
    console.log("No match!");
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        reset();
    }, 1000);
}

function reset() {
    console.log("Resetting board...");
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Function to show the win message when all cards are matched
function showWinMessage() {
    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.innerHTML = `
        <h2>Congratulations! You've matched all the cards!</h2>
        <button id="restartButton">Restart Game</button>
    `;
    
    document.body.appendChild(winMessage);

    // Add event listener to restart the game
    document.getElementById('restartButton').addEventListener('click', restartGame);
}

// Function to restart the game
function restartGame() {
    const winMessage = document.querySelector('.win-message');
    if (winMessage) {
        winMessage.remove();  // Remove the win message
    }

    // Reset matched pairs counter
    matchedPairs = 0;

    // Unflip all cards and re-enable flipping
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flip);
    });

    // You can remove the shuffle call if you want to keep the initial order
}

// Add event listeners to all cards
cards.forEach(card => card.addEventListener('click', flip));
