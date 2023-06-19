var scores, activePlayer, roundScore, gamePlaying, lastScore,
    winningScore, dice, secDice, fullDice, diceDom, diceSecRoll;
newGame ();
// Create An Event On Roll Button
document.querySelector(".btn--roll").addEventListener("click", function () {
  
    // If The Game Is Playing Make This
    if (gamePlaying){
      // 1.Random Number
      dice = Math.floor( Math.random() *6 ) +1;
      secDice = Math.floor( Math.random() *6 ) +1;
      fullDice = dice + secDice;
      
      // 2.Display The Result
      diceDom = document.querySelector(".dice");
      diceSecRoll = document.querySelector(".dice2roll");
      
      // 3.Update the roll if the rolled not = 1
      if (dice === 6 && lastScore === 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score--" + activePlayer).textContent = "0";
        nextPlayer();
      }
      else if (dice !== 1  &&  secDice !==1 ){
        // Add Score
        roundScore += fullDice
        document.querySelector("#current--" + activePlayer).textContent = roundScore;
      }
      else {
        nextPlayer();
      };
      lastScore = dice;
      // 4.Show The Dice Roll When Rolled
      diceDom.style.display ="block";
      diceSecRoll.style.display = "block";
      
      // 5.Show The Image For Every Roll Number
      diceDom.src = "dice-" + dice + ".png";
      diceSecRoll.src = "dice-" + secDice + ".png";
    }; // End Of IF GamePlaying Condition in Roll Button
    
}); // End The Roll Button Event

 // Create An Event On Hold Button
document.querySelector(".btn--hold").addEventListener ("click", function (){
    // If The Game Is Playing Make This 
  if (gamePlaying){
    // 1.Add Current To Global Score
    scores[activePlayer] += roundScore;
    // 2.Add To UI html
    document.querySelector("#score--" + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector(".Final-Score").value;
    
    // Undefined , 0 , null or "" , are COERCED TO false
    // Anything else is Coerced to TRUE
    if (input){
      winningScore = input;
    } else {
      winningScore = 30;
    }
    if (scores[activePlayer] >= winningScore) {
    
      // 2.1.Change Text to Winner
      document.querySelector("#name--" + activePlayer).textContent = "Winner!"; 

      // 2.2.Hide The Roll When Player Won The Game
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2roll").style.display = "none";

      // 2.3. Add And Remove The Classes When The Active Player Won The Game  
      document.querySelector(".player--" + activePlayer).classList.add("player--winner");
        document.querySelector(".player--" + activePlayer).classList.remove("player--active");
        
      // When Game Is Over Don't Make Any Events
        gamePlaying = false;
       } // End Of IF Scores Condition
    else {
      nextPlayer();
    };// When Game Is Over

  }; //  End Of IF GamePlaying Condition in Hold Button
    
}); // End The Hold Button Event

  // Next PLayer Function
  function nextPlayer (){
    // 1.If The Player 0 Is Active Make The Another Player Is Active  
    activePlayer === 0? activePlayer =1 : activePlayer = 0; 
      roundScore = 0;
    
    // 3.Change The Active Player Class For The Both Players
      document.querySelector(".player--0").classList.toggle ("player--active");
      document.querySelector(".player--1").classList.toggle ("player--active");

    // 4..Hide The Roll When Change The Active Player 
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2roll").style.display = "none";
  }; // End Next Player Function

// Start New Game Button Event
document.querySelector(".btn--new").addEventListener("click", newGame)
function newGame(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  
  // 1.Hide The Roll Before Start The Game
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2roll").style.display = "none";


  // 2.Make The Score Of The Both Players = 0
  document.getElementById ("score--0").textContent = "0";
  document.getElementById ("score--1").textContent = "0";
  document.getElementById ("current--0").textContent = "0";
  document.getElementById ("current--1").textContent = "0";

  // 3.Change The "Winner" Text To The Start Name
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";

  // 4.Remove Classes
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  // Add Active Class To The Start
  document.querySelector(".player--0").classList.add("player--active");
}