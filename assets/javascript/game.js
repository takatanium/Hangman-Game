//Global constant variables

// Game difficulty objects
var gameMode = [];

var easyMode = {
		desig:"Easy", 
		iStart: 0, 
		iStop: 18,
		set: [0,18], 
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		lossPenalty: 25,
		winAward: 5,
		color: "#5bc0de"};
gameMode.push(easyMode);

var midMode = {
		desig:"Mid", 
		iStart: 0, 
		iStop: 54, 
		set: [0,54],
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		winAward: 5,
		lossPenalty: 25,
		color: "#f0ad4e"};
gameMode.push(midMode);

var hardMode = {
		desig: "Hard",
		iStart: 0, 
		iStop: 109,
		set: [0,109], 
		display: "symbol",
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		winAward: 5,
		lossPenalty: 25,
		color: "#d9534f"};
gameMode.push(hardMode);

var atomicMode = {
		desig:"Atomic",
		iStart: 0,
		iStop: 109, 
		set: [0,109],
		display: "number", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		lossPenalty: 25,
		winAward: 5,
		color: "#5cb85c"};
gameMode.push(atomicMode);

var debugMode = {
		desig: "Debug", 
		iStart: 0, 
		iStop: 5, 
		set: [0,5],
		display: "symbol", 
		maxWins: 10,
		maxAttempt: 3, 
		maxLoss: 4, 
		lossPenalty: 25,
		winAward: 5,
		color: "#000000"};
gameMode.push(debugMode);

//alphabet
var letters  = "abcdefghijklmnopqrstuvwxyz";

//game result objects
var aliveResult = {
		desig:"alive", 
    comment:"Awesome!", 
    gif:"https://giphy.com/embed/c7kqZMtzMLpG8",
};

var deadResult = {
		desig:"dead", 
		// comment:"Game Over...", 
		comment:"Playing dead?", 
		gif:"https://giphy.com/embed/ZWZMwJtoqAzxS",
};

var contResult = {
		desig:"cont", 
		comment:"Lucky kitty!", 
		gif:"https://giphy.com/embed/fliBUx4ZFB6HS",
};

//outcomes for death
var outcome75 = [[1,1,1,0], [1,1,0,1], [1,0,1,1], [0,1,1,1]];
var outcome50 = [[1,1,0,0], [1,0,0,1], [1,0,1,0], [0,1,0,1], [0,0,1,1]];
var outcome25 = [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]];
var wfnArray;

//Reset at start of new game
var overLoss; //running number of overall losses 
var minLoss; //minimum amoutnof losses to lose
var win; //dynamically set win counter
var loss; //dynamically set loss counter
var lossPercent = 0; //dynamically change loss gauge
var elementSubSet = []; //subset of master elements array
var elementPastSet = []; //history of past element generation
var gameOver = true; //halt functions when game ends
var mode; //game mode

//Reset at start of element generation
var userGuess = []; //letters that user guessed
var correctGuess = []; //correct letters guessed
var elementIndex = -1; //track current index of element array
var elementString = ""; //track the current elements string
var iElement = ""; //element generated
var stopGame = true; //halt functions when element is shown

var meowSound = new Audio("assets/audio/meow2.mp3");
var clonkSound = new Audio("assets/audio/clonk.mp3");
var aliveSong = new Audio("assets/audio/periodic-song.mp3");
var deadSong = new Audio("assets/audio/funeral-song.mp3");

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
    console.log(stopGame);
  }
  //in game play
  else if (!stopGame && event.keyCode >= 65 && event.keyCode <= 90) {
  	game.update(event.keyCode);
  }
  console.log("stopGame: "+ stopGame);
  console.log("gameOver: "+ stopGame);
});

//main game oject
var game = {

		init: function(gamemode) {
			mode = gamemode; //globally track game mode
			this.resetGameVars(""); //reset global variable

			//push subset of elements based on game mode
			for (var i = mode.iStart; i < mode.iStop; i++) {
				elementSubSet.push(elements[i]);
			}

			minLoss = Math.max(mode.lossPenalty, ((1/elementSubSet.length)*100)); //determine the mininimum amount of losses
 			arena.closeCover(); //close the cover
			this.genElement(); //generate first element
		},

		genElement: function() {
			console.log("Try generation");
			if (stopGame && !gameOver) {
				this.resetGenVars();

				//based on random pick save info of element
				elementIndex = tools.getRandom(elementSubSet.length);
				iElement = elementSubSet[elementIndex];
				elementString = iElement.name;
				console.log("Successful generation");

				lett.makeKeys(); //display keys
				elem.displaySymbol(); //display symbol
				elem.displayGuess(); //display guess
				gauge.updateLett();

				//choose an array for outcomes
				wfnArray = outcome50[tools.getRandom(5)];
			}
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
          		arena.openCover("alive");
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
		       	if (elementSubSet.length === 0) {
		          gameOver = true;
		          // if (loss === minLoss) {
		          if (lossPercent === 100) {
		          	arena.openCover("dead");
		          }
		          else {
		          	arena.openCover("alive");
		       		}
		        }
		        // else if (loss === minLoss) {
		        else if (lossPercent === 100) {
		          gameOver = true;
		          // arena.openCover(game.collapseWfn());
		          arena.displayCards();
		        }
		        else {
		          clonkSound.play();
		          lett.instructions("Hit Spacebar or Click on Element");
		        }
		      }
		  	}
		  }
		},

		resetGameVars: function(status) {
			aliveSong.pause();
			aliveSong.currentTime = 0;
			deadSong.pause();
			deadSong.currentTime = 0;

			userGuess = [];
			correctGuess = [];
			stopGame = true;
			loss = 0;
			lossPercent = 0;
			gameOver = false;

			if (status === "cont") {
				arena.closeCover();
				minLoss = Math.max(mode.lossPenalty, ((1/elementSubSet.length)*100)); //determine the mininimum amount of losses
				// minLoss = Math.min(mode.maxLoss, elementSubSet.length); //determine the mininimum amount of losses
				gauge.updateLoss();
				this.genElement();
			}

			else {
				overLoss = 0;
				win = 0;
				elementSubSet = [];
				elementPastSet = [];
				iElement = "";
				elementIndex = -1;

				if (status === "alive" || status === "dead") {
					elem.clearAll();
	        elem.printList();
	        lett.clearKeys();
	        gauge.clearAll();
	        arena.restoreModeSel();
				}
			}
		},

		resetGenVars: function() {
			userGuess = [];
			correctGuess = [];
			stopGame = false;
		},

		guessResult: function(result) {
			if (result === "win") {
				win++;
				lossPercent = Math.max((lossPercent - mode.winAward), 0);
        elementPastSet.push([iElement, true]); 
			}
			else {
				loss++;
        overLoss++;
        lossPercent = Math.min((lossPercent + minLoss), 100);

    		elementPastSet.push([iElement, false]);
			}

			//remove element from sub set
			elementSubSet.splice(elementIndex, 1);

			stopGame = true;
      elem.displayGuess();
  		gauge.updateWin();
  		gauge.updateLoss();
  		elem.printList();
  		arena.updateCover();
		},

		collapseWfn: function() {
			var wfn = Math.floor(Math.random() * 10);
			if (wfn < 8) {
				return "cont";
			}
			return "dead";			
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
		},

		clearAll: function() {
			var elemGenText = document.getElementById("elem_gen_text");
			var elemGuessText = document.getElementById("elem_guess_text");

			elemGuessText.innerHTML = "";
			elemGenText.innerHTML = "";
		}
};

//display of letter gauge and instructions
var lett = {
		makeKeys: function() {
		  gauge.updateLett();

		  var lettPick = document.getElementById("lett_pick");
		  lettPick.style.display = "flex";
		  lettPick.innerHTML = "";

	    var keyCodeNum;
	    for (var i = 0; i < letters.length; i++) {
	      //for each letter make a div
	      keyCodeNum = i + 65;
	      lettPick.innerHTML += "<div class='alphabet' id='lett" + i + "' onclick='game.update(" + keyCodeNum + ")';></div>";
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
		},

		clearKeys: function() {
			gauge.updateLett();

		  var lettPick = document.getElementById("lett_pick");
		  lettPick.style.display = "flex";
		  lettPick.innerHTML = ""
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
		  // var winPercent = (win / (mode.maxWins - overLoss)) * 100;
		  var winPercent = (win / (mode.iStop - overLoss)) * 100;
		  var winStringPercent = Math.ceil(winPercent) + '%';
		  winGauge.style.width = winStringPercent;
		  winGauge.innerHTML = winStringPercent;
		},

		updateLoss: function() { 
			//need to use min of remaining and maxLoss
		  var lossGauge = document.getElementById("loss_gauge");
		  // var lossPercent = (loss / minLoss) * 100;
		  var lossStringPercent = lossPercent + '%';
		  // var lossInnerHTML = loss.toString() + " / " + minLoss.toString();
		  var lossInnerHTML = lossStringPercent;
		  lossGauge.style.width = lossStringPercent;
		  lossGauge.innerHTML = lossInnerHTML;
		},

		updateLett: function() {
		  var lettGauge = document.getElementById("lett_gauge");
		  var guessPercent = 100 - (((userGuess.length - correctGuess.length) / mode.maxAttempt) * 100);
		  var guessStringPercent = guessPercent + '%';
		  lettGauge.style.width = guessStringPercent;
		},

		clearAll: function() {
		  var winGauge = document.getElementById("win_gauge");
		  var lossGauge = document.getElementById("loss_gauge");
		  var lettGauge = document.getElementById("lett_gauge");
		  var lettGaugePercent = '0%';	
		  var lossGaugePercent = '0%';
		  var winGaugePercent = '0%';
		  lettGauge.innerHTML = "";
		  lossGauge.innerHTML = "";
		  winGauge.innerHTML = "";
		  lettGauge.style.width = lettGaugePercent;
		  lossGauge.style.width = lossGaugePercent;
		  winGauge.style.width = winGaugePercent;
		}
};

var arena = {

		closeCover: function() {
			var coverCardBox = document.getElementById("cover_card_box");
			coverCardBox.innerHTML = "";

			var cidArenaMode = document.getElementById("cid_arena_mode")
			var arenaCoverInfo = document.getElementById("arena_cover_info");
		  cidArenaMode.style.visibility = "hidden";
			arenaCoverInfo.style.visibility = "visible";

			var cidArenaCover = document.getElementById("cid_arena_cover");
			cidArenaCover.classList.remove('open-animate');
			cidArenaCover.classList.add('cover-animate');

			//display to arena cover
		  var coverInfoText1 = document.getElementById("cover_info_text1");
		  coverInfoText1.innerHTML = mode.desig;
		  coverInfoText1.style.color = mode.color;

		  this.updateCover();
		},

		openCover: function(status) {
			//remove schrodinger background
			var cidArena = document.getElementById("cid_arena");
		  cidArena.style.backgroundImage = "none";

			//depending on win or loss display different text and gifs
			var arenaResultGif = document.getElementById("arena_result_gif");
			var resultInfoText = document.getElementById("result_info_text");
		  var resultInfoBtn = document.getElementById("result_info_btn");

			if (status === "dead") {
		    deadSong.play();
				arenaResultGif.src = deadResult.gif;
				resultInfoText.innerHTML = deadResult.comment;
		    resultInfoBtn.innerHTML = "Replay?"
		    resultInfoBtn.value = deadResult.desig;
			}
			else if (status === "cont") {
				arenaResultGif.src = contResult.gif;
				resultInfoText.innerHTML = contResult.comment;
		    // resultInfoBtn.innerHTML = "Continue?";
		    resultInfoBtn.innerHTML = "Replay?";
		    // resultInfoBtn.value = contResult.desig;
		    resultInfoBtn.value = deadResult.desig;
			}
			else { //this is a overall win
		    aliveSong.play();
				arenaResultGif.src = aliveResult.gif;
				resultInfoText.innerHTML = aliveResult.comment;
		    resultInfoBtn.innerHTML = "Replay?"
		    resultInfoBtn.value = aliveResult.desig;
			}

			//animate opening of cover
			document.getElementById("cid_arena_mode").style.visibility = "hidden";
			var cidArenaCover = document.getElementById("cid_arena_cover");
			cidArenaCover.classList.remove('close-animate');
			cidArenaCover.classList.add('open-animate');

			//display background-content box
			var cidArenaResult = document.getElementById("cid_arena_result");
			cidArenaResult.style.visibility = "visible";

			lett.instructions("");
		},

		updateCover: function() {
			//decrease remaining element
		  var coverInfoText2 = document.getElementById("cover_info_text2");
			coverInfoText2.innerHTML = elementSubSet.length;
		},

		restoreModeSel: function() {
			//hide gif
			var cidArenaResult = document.getElementById("cid_arena_result");
			cidArenaResult.style.visibility = "hidden";

			//replace schrodinger background
			var cidArena = document.getElementById("cid_arena");
			cidArena.style.backgroundImage = "url('assets/images/schrodingers-cat.png')";

			//show mode selection
			var cidArenaMode = document.getElementById("cid_arena_mode");
			cidArenaMode.style.visibility = "visible";
		},

		displayCards: function() {
			var arenaCoverInfo = document.getElementById("arena_cover_info");
			var coverCardBox = document.getElementById("cover_card_box");

			var imgHTML = "<img src='assets/images/cat-icon2.png' class='card_alive_img'>";

			var topImg = "";
			var leftImg = "";
			var rightImg = "";
			var botImg = "";

			if (wfnArray[0]===1) {topImg=imgHTML;}
			if (wfnArray[1]===1) {leftImg = imgHTML;}
			if (wfnArray[2]===1) {rightImg = imgHTML;}
			if (wfnArray[3]===1) {botImg = imgHTML;}
			

			// coverCardBox.style.visibility = "visible";
			arenaCoverInfo.style.visibility = "hidden";
			lett.instructions("Find the cat! Pick a card.");

			//Change this to actual DOM manipulations...
			coverCardBox.innerHTML = "<div class='card-row' id='card_row_top'>"
      												 // + "<div class='flip-container' onclick='arena.flipCards();'>"
      												 + "<div class='flip-container' id='top' onclick='arena.flipCards(this.id);'>"
														   + "<div class='flipper card' id='card_top_center'>"
															 + "<div class='front'>?</div>"
															 + "<div class='back'>"+topImg+"</div>"
															 + "</div></div></div>"
      												 + "<div class='card-row' id='card-row_middle'>"
															 +	"<div class='flip-container' id='left' onclick='arena.flipCards(this.id);'>"
															 // +	"<div class='flip-container' onclick='arena.flipCards('"+leftResult+"');'>"
															 +	"<div class='flipper card' id='card_middle_left'>"
															 +	"<div class='front'>?</div>"
															 +	"<div class='back'>"+leftImg+"</div>"
															 +	"</div></div>"
															 +	"<div class='flip-container' id='right' onclick='arena.flipCards(this.id);'>"
															 // +	"<div class='flip-container' onclick='arena.flipCards('"+rightResult+"');'>"
															 +	"<div class='flipper card' id='card_middle_right'>"
															 +	"<div class='front'>?</div>"
															 +	"<div class='back'>"+rightImg+"</div>"
															 +	"</div></div></div>"
      												 + "<div class='card-row' id='card_row_bottom'>"
      												 + "<div class='flip-container' id='bot' onclick='arena.flipCards(this.id);'>"
      												 // + "<div class='flip-container' onclick='arena.flipCards('"+botResult+"');'>"
															 +	"<div class='flipper card' id='card_bottom_center'>"
															 +	"<div class='front'>?</div>"
															 +	"<div class='back'>"+botImg+"</div>"
															 +	"</div></div></div>";

		},

		flipCards: function(cardSel) {
			var cardTop = document.getElementById("card_top_center");
			var cardLeft = document.getElementById("card_middle_left");
			var cardRight = document.getElementById("card_middle_right");
			var cardBottom = document.getElementById("card_bottom_center");
			cardTop.classList.add('animate-flip');
			cardLeft.classList.add('animate-flip');
			cardRight.classList.add('animate-flip');
			cardBottom.classList.add('animate-flip');

			var result;
			if (cardSel === "top") {
				cardTop.style.boxShadow = "0px 10px 50px green";
				if (wfnArray[0] === 1) {
					result = "cont";
				}
				else {
					result = "dead";
				}
			}
			else if (cardSel === "left") {
				cardLeft.style.boxShadow = "0px 10px 50px green";
				if (wfnArray[1] === 1) {
					result = "cont";
				}
				else {
					result = "dead";
				}
			}
			else if (cardSel === "right") {
				cardRight.style.boxShadow = "0px 10px 50px green";
				if (wfnArray[2] === 1) {
					result = "cont";
				}
				else {
					result = "dead";
				}
			}
			else {
				cardBottom.style.boxShadow = "0px 10px 50px green";
				if (wfnArray[3] === 1) {
					result = "cont";
				}
				else {
					result = "dead";
				}
			}
			
			arena.openCover(result);
		}
};


