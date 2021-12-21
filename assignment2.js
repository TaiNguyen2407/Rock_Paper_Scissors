// Play game
function playGame(){
    let pScore = 0;
    let cScore = 0;
    let winHistory = [];
    const gameOverText = document.querySelector(".gameover p");
    const options = document.querySelectorAll('.options button')
    const playerSide = document.querySelector('.player-side');
    const computerSide = document.querySelector('.computer-side');
    const hands = document.querySelectorAll('.rock img');

    hands.forEach(hand => {
        hand.addEventListener('animationend', function(){
            this.style.animation = '';
        });
    });

    // Computer Options
    const computerOptions = ['rock', 'paper', 'scissors'];
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const computerNumber = Math.floor(Math.random()*3);
            const computerChoice = computerOptions[computerNumber];
            disabledBtn();
        

            setTimeout(() =>{
                compareHands(this.textContent, computerChoice);
                // Update images
                playerSide.src = `pics/${this.innerText}.png`;
                computerSide.src = `pics/${computerChoice}.png`;
                if(checkWinsInARow (3)) {
                    resetFig();
                } else {
                    const tenWins = 10;
                    if(pScore == tenWins){
                        gameOverText.textContent = "Congratulations!!You Won the Game!!"
                        resetFig();
                    }else if (cScore == tenWins) {
                        gameOverText.textContent = 'Computer Has Beaten You. You Are A Loser!!'
                        resetFig();
                    }
                }
                enabledBtn();
            }, 1000);

            // Animation
            playerSide.style.animation = "shakePlayer 2s ease";
            computerSide.style.animation = "shakeComputer 2s ease";
            })
            
        }); 
    // Disable button
    const disabledBtn = ()=>{
        for (const option of options){
            option.disabled = true;
            option.style.background = 'rgb(90,82,82)';
        }
    };
    // Enable button
    const enabledBtn = () => {
        for(const option of options){
            option.disabled = false;
            option.style.background ='';
        }
    };

    // Function for play again button
    const resetFig = ()=> {
        const playAgnBtn = document.querySelector('.gameover button');
        playAgnBtn.addEventListener('click', ()=>{
            pScore = 0;
            cScore = 0;
            winHistory = [];
        });
    }
    // Funtionc for updating scores
    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    // check wins in a row
    const checkWinsInARow = (winCount) => {

        if (winHistory.length < winCount) {
            return false;
        }
        const itemCompared = winHistory.slice(winHistory.length - winCount);
        console.log(itemCompared);
        
        const last = itemCompared[winCount - 1];
        console.log('lastElement:', last);
        let counter = 1;
        
        for (let i = winCount - 2; i >= 0; i--) {
            console.log(itemCompared[i]);
            if (itemCompared[i] === last) {
                counter++;
                console.log(counter + 'win(s) in a row');
            }else {
                break;
            }
            
            if (counter === winCount) {
                if(last === 'c') {
                    console.log('return', checkWinsInARow);
                    return (gameOverText.textContent = 'Computer: '+ winCount + ' wins in a row !!');
                }
                if(last === 'p') {
                    console.log('return', checkWinsInARow);
                    return (gameOverText.textContent = 'Player: ' + winCount + ' wins in a row !!'); 
                }
            }
        }
        return;
    };



    // Comparing player and computer options
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.start');
        // Check for tie
        if(playerChoice === computerChoice){
            winner.textContent = "It's a tie";
            winHistory.push("t");
            return;
        };
        // check for rock
        if (playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = "Rock beats Scissors. Yon Won!";
                pScore++;
                updateScore();
                winHistory.push("p");
                return;
            } else {
                winner.textContent = "Rock is beaten by Paper. Computer Won!";
                cScore++;
                updateScore();
                winHistory.push("c");
                return;
            }
        }
        // check Paper
        if (playerChoice === 'paper'){
            if(computerChoice === 'rock'){
                winner.textContent = "Paper beats Rock. You Won!";
                pScore++;
                updateScore();
                winHistory.push("p");
                return;
            } else {
                winner.textContent = "Paper is beaten by Scissors. Computer Won!";
                cScore++;
                updateScore();
                winHistory.push("c");
                return;
            }
        }
        // Check for scissors
        if (playerChoice === 'scissors'){
            if(computerChoice === 'paper'){
                winner.textContent = "Scissors beats Paper. You Won!";
                pScore++;
                updateScore();
                winHistory.push("p");
                return;
            } else {
                winner.textContent = "Scissors is beaten by Rock. Computer Won!";
                cScore++;
                updateScore();
                winHistory.push("c");
                return;
            }
        }
    };
    // call inner funtioncs
    updateScore();
    compareHands();
}

playGame();