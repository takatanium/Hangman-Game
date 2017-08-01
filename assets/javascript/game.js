//Global constant variables
var gameMode = [ [18, "Easy", "#5bc0de"], //easy mode
                 [54, "Medium", "#f0ad4e"], //medium mode
                 [109, "Hard", "#d9534f"], //hard mode
                 [109, "Atomic", "#5cb85c"], //atomic mode
                 [5, "Debug", "#000000"] //debug mode
               ];

var letters  = "abcdefghijklmnopqrstuvwxyz";

var maxAttempts = 3;
var maxLosses = 4;

//Ending gifs
var winGif = "https://giphy.com/embed/c7kqZMtzMLpG8";
var winComment = "Awesome!";
var deathGif = "https://giphy.com/embed/ZWZMwJtoqAzxS";
var deathComment = "Game Over...";
var luckGif = "https://giphy.com/embed/fliBUx4ZFB6HS";
var luckComment = "Lucky kitty!";

//Reset at start of new game
var mode = 1; //default to easy mode
var wins;
var losses;
var elementSubSet = [];
var elementPastSet = [];

//Reset at start of new element
var userGuess = []; 
var correctGuess = [];
var elementString = "";
var stopGame = false;
var gameOver = false;

//Indicates very first game
var elementIndex = -1;
var elementGen = "";

//toggle whether atomic symbol or number is shown
var toggleSymbol = true;

//sounds
var bellSound = document.getElementById("bell_sound");
var clonkSound = document.getElementById("clonk_sound");

//event listeners
document.addEventListener('keyup', function(event) {
  //initiate the game
  if (elementGen === "" && elementIndex === -1) {
  	if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5") {
    	initiateGame(event.key-1);
  	}
  }
  //generate new element
  else if (stopGame && event.keyCode === 13 && !gameOver) {
    genElement();
    updateLettGauge();
    displayInstructions("");
    stopGame = false;
  }
  //in game play
  else if (!stopGame && event.keyCode >= 65 && event.keyCode <= 90) {
    captureKeyEvent(event);
  }
});

//Main gameplay interaction, keyboard events
function captureKeyEvent(event) {

  var letterIndex = event.keyCode - 65; //define the index of the keycode
  var keyChar = letters.charAt(letterIndex);

  displayInstructions("");

  if (userGuess.indexOf(keyChar) === -1) { //ensure only unique guesses
    userGuess.push(keyChar); //add letter to user guess array

    if (compareGuess(keyChar)) { //compare to chosen element string
      displayElement(0);

      if (elementString.length === 0) { //check if won
        wins++;
        stopGame = true;
        bellSound.play();
        displayInstructions("Press Enter");
        shiftElements(true);

        //check if anymore elements
        if (elementSubSet.length === 0) {
          gameOver = true;
          openCover("win");
        }
      }
    }
    else {
      if ((userGuess.length - correctGuess.length) === maxAttempts) {
        losses++;
        stopGame = true;
        clonkSound.play();
        displayInstructions("Press Enter");
        updateLossGauge();
        displayElement(1);
        shiftElements(false);

        //check if reached max losses
        if (losses === maxLosses) {
          gameOver = true;
          displayInstructions("");
          openCover(collapseWfn());
        }
        else if (elementSubSet.length === 0) {
          gameOver = true;
          displayInstructions("");
          openCover("win");
        }
      }
      else {
      displayElement(0);
      }
    }
  }
  else {
    displayInstructions(keyChar.toUpperCase() + " already used.");
  }

  updateLettGauge();
}

//Game initiation, reset variables and pick an element
function initiateGame(mode) {
  //reset all variables
  wins = 0;
  losses = 0;
  elementSubSet = [];
  elementPastSet = [];
  userGuess = []; 
  correctGuess = [];
  elementString = "";
  stopGame = false;
  elementIndex = -1;
  elementGen = "";
  toggleSymbol = true;

  if (mode === 3) { //atomic mode uses atomic numbers
  	toggleSymbol = false;
  }
  else {
  	toggleSymbol = true;
  }

  //push subset of elementList into elements
  for (var i = 0; i < gameMode[mode][0]; i++) {
  	elementSubSet.push(elements[i]);
  }

  //display to arena cover
  var coverInfoText1 = document.getElementById("cover_info_text1");
  var coverInfoText2 = document.getElementById("cover_info_text2");
  coverInfoText1.innerHTML = gameMode[mode][1];
  coverInfoText1.style.color = gameMode[mode][2];
  coverInfoText2.innerHTML = gameMode[mode][0];

  if (closeCover()) {
    genElement();
  }
}

function genElement() {
  //Reset variables
  userGuess = [];
  correctGuess = [];
  elementString = "";
  stopGame = false;

  //random generation of element in sub set
  elementIndex = Math.floor(Math.random() * elementSubSet.length);
  elementString = elementSubSet[elementIndex].name; //save element string
  elementGen = elementSubSet[elementIndex]; //save element object

  //Display atomic symbol to screen
  var elemGenText = document.getElementById("elem_gen_text");
  if (toggleSymbol) {
    elemGenText.innerHTML = elementGen.symbol;
  }
  else {
    elemGenText.innerHTML = elementGen.number;
  }

  displayElement(0);
  return elementIndex;
}

function displayElement(status) {
  var elemGuessText = document.getElementById("elem_guess_text");

  blankedText = "";
  elemGuessText.style.color = "black";
  
  if (status === 0) {
    if (correctGuess.length === 0) {
      for (var i = 0; i < elementGen.name.length; i++) {
        blankedText += "_ ";
      }
    }

    else {
      for (var i = 0; i < elementGen.name.length; i++) {
        for (var j = 0; j < correctGuess.length; j++) {
          if (elementGen.name[i] === correctGuess[j]) {
            blankedText += correctGuess[j].toUpperCase() + " ";
            break;
          }
          if (j == correctGuess.length - 1) {
            blankedText += "_ ";
          }
        }
      }
    }
  }
  else {
    for (var i = 0; i < elementGen.name.length; i++) {
      blankedText += elementGen.name[i].toUpperCase() + " ";
    }
    elemGuessText.style.color = "red"; 
  }

  elemGuessText.innerHTML = blankedText;
}

function updateLettGauge() {
  var guessChars = "";
  var lettGauge = document.getElementById("lett_gauge");
  var guessPercent = ((userGuess.length - correctGuess.length) / maxAttempts) * 100;
  var guessStringPercent = guessPercent + '%';

  lettGauge.style.width = guessStringPercent;

  for (var i = 0; i < userGuess.length; i++) {
    if (correctGuess.indexOf(userGuess[i]) === -1) {
      guessChars += userGuess[i].toUpperCase() + " ";
    }
  }

  if (guessChars.length > 0) {
    lettGauge.innerHTML = guessChars;
  }
  else {
    lettGauge.innerHTML = "";
  }
}

function compareGuess(lett) {
  if (elementGen.name.match(lett)) {
    correctGuess.push(lett); //push letter to correct guess array
    elementString = elementString.replace(new RegExp(lett, 'g'), "");
    return true;
  }
  return false;
}

//randomizer to determine death of cat
function collapseWfn() {
	var wfn = Math.floor(Math.random() * 10);
	if (wfn < 5) {
		return "lucky";
	}
	return "lost";
}

function updateLossGauge() {
  var lossGauge = document.getElementById("loss_gauge");
  var lossPercent = (losses / maxLosses) * 100;
  var lossStringPercent = lossPercent + '%';
  lossGauge.style.width = lossStringPercent;
  lossGauge.innerHTML = lossStringPercent;
}

function printElements() {
	var solvListItems = document.getElementById("solv_list_items");
	solvListItems.innerHTML = "";

	var symOrNum;

	for (var i = 0; i < elementPastSet.length; i++) {
		if (toggleSymbol) {
			symOrNum = elementPastSet[i][0].symbol;
		}
		else {
			symOrNum = elementPastSet[i][0].number;
		}

		if (elementPastSet[i][1] === false) { //guessed incorrectly
			solvListItems.innerHTML += "<a href=" 
		                         + elementPastSet[i][0].wiki 
		                         + " target='_blank' class='list-group-item list-group-item-danger'>"
		                         + symOrNum + ":" 
		                         + capFirst(elementPastSet[i][0].name) + "</a>";
		}
		else {
			solvListItems.innerHTML += "<a href=" 
		                         + elementPastSet[i][0].wiki 
		                         + " target='_blank' class='list-group-item'>"
		                         + symOrNum + ":" 
		                         + capFirst(elementPastSet[i][0].name) + "</a>";
		}
	}

	//decrease remaining element
  var coverInfoText2 = document.getElementById("cover_info_text2");
	coverInfoText2.innerHTML = elementSubSet.length;
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shiftElements(correctGuess) {
	//push element object into past set
	elementPastSet.push([elementGen, correctGuess]);

	//remove element from sub set
	elementSubSet.splice(elementIndex, 1);

	printElements(); //print elements to screen
}

//This is done at start of game or if cat survives
function closeCover() {
	var solvArenaMode = document.getElementById("solv_arena_mode")
  solvArenaMode.style.visibility = "hidden";
	
	var solvArenaCover = document.getElementById("solv_arena_cover");
	solvArenaCover.classList.remove('open-animate');
	solvArenaCover.classList.add('cover-animate');

  return true;
}

//This is done if radioactive meter reaches 100%
function openCover(status) {
	elementGen = ""; //make sure keyboard cannot be used

	//remove schrodinger background
	var solvArena = document.getElementById("solv_arena");
  solvArena.style.backgroundImage = "none";
	// solvArena.style.visibility = "hidden";

	//depending on win or loss display different text and gifs
	var arenaResultGif = document.getElementById("arena_result_gif");
	var resultInfoText = document.getElementById("result_info_text");
  var resultInfoBtn = document.getElementById("result_info_btn");

	if (status === "lost") {
		arenaResultGif.src = deathGif;
		resultInfoText.innerHTML = deathComment;
    resultInfoBtn.innerHTML = "Replay?"
    resultInfoBtn.value = 0;
	}
	else if (status === "lucky") {
		arenaResultGif.src = luckGif;
		resultInfoText.innerHTML = luckComment;
    resultInfoBtn.innerHTML = "Continue?"
    resultInfoBtn.value = 1;
	}
	else { //this is a overall win
		arenaResultGif.src = winGif;
		resultInfoText.innerHTML = winComment;
    resultInfoBtn.innerHTML = "Replay?"
    resultInfoBtn.value = 0;
	}

	//animate opening of cover
	document.getElementById("solv_arena_mode").style.visibility = "hidden";
	var solvArenaCover = document.getElementById("solv_arena_cover");
	solvArenaCover.classList.remove('close-animate');
	solvArenaCover.classList.add('open-animate');

	//display background-content box
	var solvArenaResult = document.getElementById("solv_arena_result");
	solvArenaResult.style.visibility = "visible";
}

function displayInstructions(instr) {
	var coverInfoText3 = document.getElementById("cover_info_text3");
	coverInfoText3.innerHTML = instr;
}

function resetGame(val) {
  console.log(val);

	//hide gif
	var solvArenaResult = document.getElementById("solv_arena_result");
	solvArenaResult.style.visibility = "hidden";

	//replace schrodinger background
	var solvArena = document.getElementById("solv_arena");
	solvArena.style.backgroundImage = "url('assets/images/schrodingers-cat.png')";

	//show mode selection
	var solvArenaMode = document.getElementById("solv_arena_mode");
	solvArenaMode.style.visibility = "visible";

  //remove guess element
  var elemGuessText = document.getElementById("elem_guess_text");
  elemGuessText.innerHTML = "";

  //remove symbol
  var elemGenText = document.getElementById("elem_gen_text");
  elemGenText.innerHTML = "";

  //reset game
  if (val === "0") { 
  	//remove elements in list
  	elementPastSet = [];
  	printElements();
    elementIndex = -1
    wins = 0;
  }
  //continue game
  else {
    closeCover();
    genElement();
    displayInstructions("");
    stopGame = false;
  }

  losses = 0;
  userGuess = [];
  correctGuess = [];
  stopGame = false;
  gameOver = false;
  updateLossGauge();
  updateLettGauge();
}