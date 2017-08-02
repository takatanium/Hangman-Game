//Global constant variables

// Game difficulty objects
var gameMode = [];

var easyMode = {
		desig:"Easy", 
		iStart: 0, 
		iStop: 18, 
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		color: "#5bc0de"};
gameMode.push(easyMode);

var midMode = {
		desig:"Mid", 
		iStart: 0, 
		iStop: 54, 
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		color: "#f0ad4e"};
gameMode.push(midMode);

var hardMode = {
		desig: "Hard",
		iStart: 0, 
		iStop: 109, 
		display: "symbol",
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		color: "#d9534f"};
gameMode.push(hardMode);

var atomicMode = {
		desig:"Atomic",
		iStart: 0,
		iStop: 109, 
		display: "number", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		color: "#5cb85c"};
gameMode.push(atomicMode);

var debugMode = {
		desig: "Debug", 
		iStart: 0, 
		iStop: 5, 
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		color: "#000000"};
gameMode.push(debugMode);

//alphabet
var letters  = "abcdefghijklmnopqrstuvwxyz";

//game result objects
var winResult = {
		desig:"Win", 
    comment:"Awesome!", 
    gif:"https://giphy.com/embed/c7kqZMtzMLpG8",
    audio: function() {
    			   var song = new Audio("assets/audio/periodic-song.mp3");
    			   song.play();
    			 }
};

var loseResult = {
		desig:"Lose", 
		comment:"Game Over...", 
		gif:"https://giphy.com/embed/ZWZMwJtoqAzxS",
		sound: function() {
    			   var song = new Audio("assets/audio/funeral-song.mp3");
    			   song.play();
    			 }
};

var contResult = {
		desig:"Cont", 
		comment:"Lucky kitty!", 
		gif:"https://giphy.com/embed/fliBUx4ZFB6HS",
	  sound: function() {
    			   // var song = new Audio("assets/audio/funeral-song.mp3");
    			   // song.play();
    			 }
};

//Reset at start of new game
var overLoss; //running number of overall losses 
var win; //dynamically set win counter
var loss; //dynamically set loss counter
var elementSubSet = []; //subset of master elements array
var elementPastSet = []; //history of past element generation
var gameOver = true; //halt functions when game ends
var mode; //game mode

//Reset at start of element generation
var userGuess = []; //letters that user guessed
var correctGuess = []; //correct letters guessed
// var elementIndex = -1; //track current index of element array
var elementString = ""; //track the current elements string
var iElement = ""; //element generated
var stopGame = true; //halt functions when element is shown

var meowSound = new Audio("assets/audio/meow2.mp3");
var clonkSound = new Audio("assets/audio/clonk.mp3");

//keyboard event listener
document.addEventListener('keyup', function(event) {
  //initiate the game
  if (iElement === "") {
  	if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5") {
    	game.init(gameMode[event.key-1]);
  	}
  }
  //generate new element on spacebar
  else if (stopGame && !gameOver && event.keyCode === 32 ) {
    game.genElement();
  }
  //in game play
  else if (!stopGame && event.keyCode >= 65 && event.keyCode <= 90) {
  	game.update(event.keyCode);
  }
});

//main game oject
var game = {

		init: function(gamemode) {
			mode = gamemode; //globally track game mode
			this.resetVars(); //reset global variable

			//push subset of elements based on game mode
			for (var i = mode.iStart; i < mode.iStop; i++) {
				elementSubSet.push(elements[i]);
			}

			this.genElement(); //generate first element
		},

		genElement: function() {
			this.resetVars();

			//based on random pick save info of element
			iElement = elementSubSet[tools.getRandom(elementSubSet.length)];
			elementString = iElement.name;

			console.log("Generated " + elementString);

			lett.makeKeys(); //display keys
			elem.displaySymbol(); //display symbol
			elem.displayGuess(); //display guess
		},

		update: function(keyCodeNum) {
			var letterIndex = keyCodeNum - 65; //define the index of the keycode
  		var keyChar = letters.charAt(letterIndex);

  		if (userGuess.indexOf(keyChar) === -1) { //ensure only unique guesses
    		userGuess.push(keyChar); //add letter to user guess array

    		if (iElement.name.match(keyChar)) { //compare to chosen element string
    			correctGuess.push(keyChar);
    			elementString = elementString.replace(new RegExp(keyChar, 'g'), "");
		      elem.displayGuess();
		      lett.makeKeys();

		      if (elementString.length === 0) { //check if won
        		this.guessResult("win");

        		//check if anymore elements
        		if (elementSubSet.length === 0) {
          		gameOver = true;
          		// openCover("win");
        		}
        		else {
          		lett.instructions("Hit Spacebar or Click on Element");
          		meowSound.play();
        		}
		   	  }
		  	}

		  	else {
		      lett.makeKeys();

		      if ((userGuess.length - correctGuess.length) === mode.maxAttempt) {
		      	this.guessResult("loss");

		        //check if reached max losses
		        if (loss === mode.maxLoss) {
		          gameOver = true;
		          // openCover(collapseWfn());
		        }
		        else if (elementSubSet.length === 0) {
		          gameOver = true;
		          // openCover("win");
		        }
		        else {
		          clonkSound.play();
		          lett.instructions("Hit Spacebar or Click on Element");
		        }
		      }
		  	}
		  }
		},

		resetVars: function() {
			userGuess = [];
			correctGuess = [];
			stopGame = false;

			//clear instructions

			if (gameOver) {
				overLoss = 0;
				win = 0;
				loss = 0;
				elementSubSet = [];
				elementPastSet = [];
				gameOver = false;
				iElement = "";

				//clear keys
				//clear all gauges
				//clear cid list
				//clear cid arena
				//display cid mode selector
			}
		},

		guessResult: function(result) {
			if (result === "win") {
				win++;
        elementPastSet.push([iElement, true]); 
			}
			else {
				loss++;
        overLoss++;
    		elementPastSet.push([iElement, false]);
			}
			stopGame = true;
      elem.displayGuess();
  		gauge.updateWin();
  		gauge.updateLoss();
  		elem.printList();
		}
};

//oject to handle displays of element
var elem = {

		displaySymbol: function() {
		  var elemGenText = document.getElementById("elem_gen_text");
			if (mode.display === "symbol") {
			  elemGenText.innerHTML = iElement.symbol;
			}
			else {
			  elemGenText.innerHTML = iElement.number;
			}
		},

		displayGuess: function() {
  		var elemGuessText = document.getElementById("elem_guess_text");

  		blankedText = "";
  		elemGuessText.style.color = "black";
  
		  if ((userGuess.length - correctGuess.length) === mode.maxAttempt) {
				for (var i = 0; i < iElement.name.length; i++) {
		      blankedText += iElement.name[i].toUpperCase() + " ";
		    }
		    elemGuessText.style.color = "red";
			}

			else {
		    if (correctGuess.length === 0) {
		      for (var i = 0; i < iElement.name.length; i++) {
		        blankedText += "_ ";
		      }
		    }
		    else {
		      for (var i = 0; i < iElement.name.length; i++) {
		        for (var j = 0; j < correctGuess.length; j++) {
		          if (iElement.name[i] === correctGuess[j]) {
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
		  elemGuessText.innerHTML = blankedText;
		},

		printList: function() {
			var solvListItems = document.getElementById("cid_list_items");
			solvListItems.innerHTML = "";

			var symOrNum;

			for (var i = 0; i < elementPastSet.length; i++) {
				if (mode.display === "symbol") {
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
				                         + tools.capFirst(elementPastSet[i][0].name) + "</a>";
				}
				else {
					solvListItems.innerHTML += "<a href=" 
				                         + elementPastSet[i][0].wiki 
				                         + " target='_blank' class='list-group-item'>"
				                         + symOrNum + ":" 
				                         + tools.capFirst(elementPastSet[i][0].name) + "</a>";
				}
			}
		  var coverInfoText2 = document.getElementById("cover_info_text2");
			coverInfoText2.innerHTML = elementSubSet.length;
		}
};

//display of letter gauge and instructions
var lett = {
		makeKeys: function() {
		  this.updateGauge();

		  var lettPick = document.getElementById("lett_pick");
		  lettPick.style.display = "flex";
		  lettPick.innerHTML = "";

		  // if (status === "reset") {
		    var keyCodeNum;
		    for (var i = 0; i < letters.length; i++) {
		      //for each letter make a div
		      keyCodeNum = i + 65;
		      lettPick.innerHTML += "<div class='alphabet' id='lett" + i + "' onclick='captureKeyEvent(" + keyCodeNum + ")';></div>";
		      var lettPickX = document.getElementById("lett" + i);
		      lettPickX.innerHTML = letters[i].toUpperCase();

		      for (var j = 0; j < userGuess.length; j++) {

		        if (letters[i] === userGuess[j]) {
		          if (correctGuess.indexOf(userGuess[j]) === -1) { //wrong guess
		            lettPickX.innerHTML += "<div id='xout" + j + "'>X</div>";

		            var xout = document.getElementById("xout" + j);
		            xout.style.color = "red";
		            xout.style.position = "absolute";
		            xout.style.top = "0px";
		            xout.style.fontFamily = "'Julee', cursive";
		          }
		          lettPickX.style.color = "lightgrey";
		        }
		      }
		    }
		  // }
		},

		updateGauge: function() {
		  var lettGauge = document.getElementById("lett_gauge");
		  var guessPercent = 100 - (((userGuess.length - correctGuess.length) / mode.maxAttempt) * 100);
		  var guessStringPercent = guessPercent + '%';
		  lettGauge.style.width = guessStringPercent;
		},

		instructions: function(instr) {
			var lettInstr = document.getElementById("lett_pick");
			lettInstr.innerHTML = instr;
		  lettInstr.style.display = "block";
		  lettInstr.style.visibility = "visible";
		}
};

//handles win and loss gauges
var gauge = {
		updateWin: function() {
		  var winGauge = document.getElementById("win_gauge");
		  var winPercent = (win / (mode.maxWins - overLoss)) * 100;
		  var winStringPercent = Math.ceil(winPercent) + '%';
		  winGauge.style.width = winStringPercent;
		  winGauge.innerHTML = winStringPercent;
		},

		updateLoss: function() {
		  var lossGauge = document.getElementById("loss_gauge");
		  var lossPercent = (loss / mode.maxLoss) * 100;
		  var lossStringPercent = lossPercent + '%';
		  var lossInnerHTML = loss.toString() + " / " + mode.maxLoss.toString();
		  lossGauge.style.width = lossStringPercent;
		  lossGauge.innerHTML = lossInnerHTML;
		}
};




