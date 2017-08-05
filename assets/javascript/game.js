//Global variables
var mode; //game mode object
var stats; //game stats object
var sets; //game sets object
var guess; //game guess object

//keyboard event listener
document.addEventListener('keyup', function(event) {
	if (typeof stats === 'undefined') {
		stats = game.genStats();
		arena.displayModeSel();
		lett.instructions("");
		var letter = document.getElementById("lett");
		letter.onclick = "";
	}
	else {
		//initiate the game
	  if (stats.iElement === "") {
	  	if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5") {
	    	game.init(event.key-1);
	  	}
	  }
	  //generate new element on spacebar
	  else if (stats.stopGame && !stats.gameOver && event.keyCode === 32 ) {
	    game.genElement();
	  }
	  //in game play
	  else if (!stats.stopGame && event.keyCode >= 65 && event.keyCode <= 90) {
	  	game.update(event.keyCode);
	  }
	}
});

//main game oject
var game = {

		init: function(modeNum) {
			mode = this.genMode(modeNum); //globally track game mode
			stats = game.genStats(); //gen stats object
			sets = this.genSets(); //gen sets arrays
			guess = this.genGuess(); //gen guess arrays

			//push subset of elements based on game mode
			for (var i = mode.iStart; i < mode.iStop; i++) {
				sets.elementSubSet.push(elements[i]);
			}

			stats.minLoss = Math.max(mode.lossPenalty, ((1/sets.elementSubSet.length)*100)); //determine the mininimum amount of losses
 			arena.closeCover(); //close the cover 			
			this.genElement(); //generate first element
			stats.gameOver = false;
		},

		preload: function() {
			var lettGauge = document.getElementById("lett_gauge");
		  var guessPercent = 100;
		  var guessStringPercent = guessPercent + '%';
		  lettGauge.style.width = guessStringPercent;
			var letter = document.getElementById("lett");
		  letter.onclick = function() {
		  	stats = game.genStats();
				arena.displayModeSel();
				lett.instructions("");
				letter.onclick = "";
		  };
			lett.instructions('Press Any Key to Start or Click Here.');
		},

		genMode: function(modeNum) {
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
			return gameMode[modeNum];
		},

		genStats: function() {
			var gameStats = { 
				//Reset at start of new game
				overLoss: 0, //running number of overall losses 
				minLoss: 0, //minimum amount of losses to lose
				win: 0, //dynamically sets win counter
				loss: 0, //dynamically sets loss counter
				lossPercent: 0, //dynamically changes loss gauge
				gameOver: true, //halt functions when game ends

				//Reset at start of element generation
				elementIndex: -1, //track current index of element array
				elementString: "", //track the current elements string
				iElement: "", //element generated
				stopGame: true //halt functions when element is shown
			}

			return gameStats;
		},

		genSets: function() {
			var gameSets = {
				elementSubSet: [],
				elementPastSet: []
			}
			return gameSets;
		},

		genGuess: function() {
			var gameGuess = {
				userGuess: [],
				correctGuess: []
			}
			return gameGuess;
		},

		genResult: function(statNum) {
			//game result objects
			var gameResult = [];
			var aliveResult = {
					desig:"alive", 
			    comment:"Awesome!", 
			    btn: "Replay?",
			    gif:"https://giphy.com/embed/c7kqZMtzMLpG8",
			    song: function() {
			    	sound.song("win");
			    }
			};
			gameResult.push(aliveResult);

			var deadResult = {
					desig:"dead", 
					comment:"Game Over...", 
					btn: "Replay?",
					gif:"https://giphy.com/embed/ZWZMwJtoqAzxS",
					song: function() {
			    	sound.song("lose");
			    }
			};
			gameResult.push(deadResult);

			var contResult = {
					desig:"cont", 
					comment:"Lucky kitty!",
					btn: "Coninue?", 
					gif:"https://giphy.com/embed/fliBUx4ZFB6HS",
					song: function() {
			    	// sound.song("win");
			    }
			};
			gameResult.push(contResult);

			return gameResult[statNum];
		},

		genWfn: function(chanceNum) {
			var outcome75 = [[1,1,1,0], [1,1,0,1], [1,0,1,1], [0,1,1,1]];
			var outcome50 = [[1,1,0,0], [1,0,0,1], [1,0,1,0], [0,1,0,1], [0,0,1,1]];
			var outcome25 = [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]];

			return outcome50[tools.getRandom(outcome50.length)];
		},

		genElement: function() {
			this.resetGenVars();

			//based on random pick save info of element
			stats.elementIndex = tools.getRandom(sets.elementSubSet.length);
			stats.iElement = sets.elementSubSet[stats.elementIndex];
			stats.elementString = stats.iElement.name;

			lett.makeKeys(); //display keys
			elem.displaySymbol(); //display symbol
			elem.displayGuess(); //display guess
			gauge.updateLett();
		},

		update: function(keyCodeNum) {
			var letters  = "abcdefghijklmnopqrstuvwxyz";
			var letterIndex = keyCodeNum - 65; //define the index of the keycode
  		var keyChar = letters.charAt(letterIndex);

  		if (guess.userGuess.indexOf(keyChar) === -1) { //ensure only unique guesses
    		guess.userGuess.push(keyChar); //add letter to user guess array

    		if (stats.iElement.name.match(keyChar)) { //compare to chosen element string
    			guess.correctGuess.push(keyChar);
    			stats.elementString = stats.elementString.replace(new RegExp(keyChar, 'g'), "");
		      elem.displayGuess();
		      lett.makeKeys();		      

		      if (stats.elementString.length === 0) { //check if won
        		this.guessResult(0);

        		//check if anymore elements
        		if (sets.elementSubSet.length === 0) {
          		stats.gameOver = true;
          		arena.openCover(0);
        		}
        		else {
          		lett.instructions("Hit Spacebar or Click on Element");
          		sound.fx("correct");          		
        		}
		   	  }
		  	}

		  	else {		  		
		      lett.makeKeys();

		      if ((guess.userGuess.length - guess.correctGuess.length) === mode.maxAttempt) {
		      	this.guessResult(1);

		        //check if reached max losses
		       	if (sets.elementSubSet.length === 0) {
		          stats.gameOver = true;
		          if (stats.lossPercent === 100) {
		          	sound.fx("wrong");
		          	arena.openCover(1);
		          }
		          else {
		          	arena.openCover(0);
		       		}
		        }
		        else if (stats.lossPercent === 100) {
		        	sound.fx("wrong");
		          stats.gameOver = true;
		          arena.displayCards();
		        }
		        else {
		          sound.fx("wrong");
		          lett.instructions("Hit Spacebar or Click on Element");
		        }
		      }
		  	}
		  }
		},

		resetGameVars: function(statNum) {
			sound.allOff();

			guess.userGuess = [];
			guess.correctGuess = [];
			stopGame = true;
			stats.loss = 0;
			stats.lossPercent = 0;
			stats.gameOver = false;
			stats.iElement = "";
			stats.elementIndex = -1;
			elem.clearAll();
      lett.clearKeys();
      gauge.clearAll();

			if (statNum === 2) {
				arena.closeCover();
				stats.minLoss = Math.max(mode.lossPenalty, ((1/sets.elementSubSet.length)*100)); //determine the mininimum amount of losses
				gauge.updateLoss();
				gauge.updateWin();
				this.genElement();
			}
			else {
				stats.overLoss = 0;
				stats.win = 0;
				sets.elementSubSet = [];
				sets.elementPastSet = [];
				stats.iElement = "";
				elementIndex = -1;
      	elem.printList();
	      arena.displayModeSel();
			}
		},

		resetGenVars: function() {
			guess.userGuess = [];
			guess.correctGuess = [];
			stats.stopGame = false;
		},

		guessResult: function(result) {
			if (result === 0) {
				stats.win++;
				stats.lossPercent = Math.max((stats.lossPercent - mode.winAward), 0);
        sets.elementPastSet.push([stats.iElement, true]); 
			}
			else {
				stats.loss++;
        stats.overLoss++;
        stats.lossPercent = Math.min((stats.lossPercent + stats.minLoss), 100);
    		sets.elementPastSet.push([stats.iElement, false]);
			}

			//remove element from sub set
			sets.elementSubSet.splice(stats.elementIndex, 1);

			stats.stopGame = true;
      elem.displayGuess();
  		gauge.updateWin();
  		gauge.updateLoss();
  		elem.printList();
  		arena.updateCover();
		},
};

//oject to handle displays of element
var elem = {

		displaySymbol: function() {
		  var elemGenText = document.getElementById("elem_gen_text");
			if (mode.display === "symbol") {
			  elemGenText.innerHTML = stats.iElement.symbol;
			}
			else {
			  elemGenText.innerHTML = stats.iElement.number;
			}
		},

		displayGuess: function() {
  		var elemGuessText = document.getElementById("elem_guess_text");

  		blankedText = "";
  		elemGuessText.style.color = "black";
  
		  if ((guess.userGuess.length - guess.correctGuess.length) === mode.maxAttempt) {
				for (var i = 0; i < stats.iElement.name.length; i++) {
		      blankedText += stats.iElement.name[i].toUpperCase() + " ";
		    }
		    elemGuessText.style.color = "red";
			}

			else {
		    if (guess.correctGuess.length === 0) {
		      for (var i = 0; i < stats.iElement.name.length; i++) {
		        blankedText += "_ ";
		      }
		    }
		    else {
		      for (var i = 0; i < stats.iElement.name.length; i++) {
		        for (var j = 0; j < guess.correctGuess.length; j++) {
		          if (stats.iElement.name[i] === guess.correctGuess[j]) {
		            blankedText += guess.correctGuess[j].toUpperCase() + " ";
		            break;
		          }
		          if (j == guess.correctGuess.length - 1) {
		            blankedText += "_ ";
		          }
		        }
		      }
		    }
		  }
		  elemGuessText.innerHTML = blankedText;
		},

		printList: function() {
			var cidListItems = handleDOM.clearEl("cid_list_items");

			var symOrNum;

			for (var i = 0; i < sets.elementPastSet.length; i++) {
				if (mode.display === "symbol") {
					symOrNum = sets.elementPastSet[i][0].symbol;
				}
				else {
					symOrNum = sets.elementPastSet[i][0].number;
				}
				if (sets.elementPastSet[i][1] === false) { //guessed incorrectly
					cidListItems.innerHTML += "<a href=" 
				                         + sets.elementPastSet[i][0].wiki 
				                         + " target='_blank' class='list-group-item list-group-item-danger'>"
				                         + symOrNum + ":" 
				                         + tools.capFirst(sets.elementPastSet[i][0].name) + "</a>";
				}
				else {
					cidListItems.innerHTML += "<a href=" 
				                         + sets.elementPastSet[i][0].wiki 
				                         + " target='_blank' class='list-group-item'>"
				                         + symOrNum + ":" 
				                         + tools.capFirst(sets.elementPastSet[i][0].name) + "</a>";
				}
			}
		},

		clearAll: function() {
			var elemGenText = handleDOM.clearEl("elem_gen_text");
			var elemGuessText = handleDOM.clearEl("elem_guess_text");
		}
};

//display of letter gauge and instructions
var lett = {
		makeKeys: function() {
		  var lettPick = this.clearKeys();

		  var letters  = "abcdefghijklmnopqrstuvwxyz";
	    var keyCodeNum;
	    for (var i = 0; i < letters.length; i++) {
	      keyCodeNum = i + 65;
	      lettPick.innerHTML += "<div class='alphabet' id='lett" + i + "' onclick='game.update(" + keyCodeNum + ")';></div>";
	      var lettPickX = document.getElementById("lett" + i);
	      lettPickX.innerHTML = letters[i].toUpperCase();

	      for (var j = 0; j < guess.userGuess.length; j++) {

	        if (letters[i] === guess.userGuess[j]) {
	          if (guess.correctGuess.indexOf(guess.userGuess[j]) === -1) { //wrong guess
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
		  var lettPick = handleDOM.clearEl("lett_pick");
		  lettPick.style.display = "flex";
		  return lettPick;
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
		  var winPercent = (stats.win / (mode.iStop - stats.overLoss)) * 100;
		  var winStringPercent = Math.ceil(winPercent) + '%';
		  winGauge.style.width = winStringPercent;
		  winGauge.innerHTML = winStringPercent;
		},

		updateLoss: function() { 
			//need to use min of remaining and maxLoss
		  var lossGauge = document.getElementById("loss_gauge");
		  var lossStringPercent = stats.lossPercent + '%';
		  var lossInnerHTML = lossStringPercent;
		  lossGauge.style.width = lossStringPercent;
		  lossGauge.innerHTML = lossInnerHTML;
		},

		updateLett: function() {
		  var lettGauge = document.getElementById("lett_gauge");
		  var guessPercent = 100 - (((guess.userGuess.length - guess.correctGuess.length) / mode.maxAttempt) * 100);
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
		parentEl: document.getElementById("cid_arena"),
		//this method generally returns arena to initial state
		displayModeSel: function() {
			this.parentEl.innerHTML = "";
			this.parentEl.style.backgroundImage = "url('assets/images/schrodingers-cat.png')";

			var cidArenaMode = handleDOM.createEl("div", ["cid-arena-mode"], "cid_arena_mode");

			var p = handleDOM.createEl("p", [], "", "Choose Difficulty");
			cidArenaMode.appendChild(p);

			var arenaModeFlex = handleDOM.createEl("div", ["arena-mode-flex"]);

			var easyBtn = handleDOM.createEl("button", ["btn", "btn-info"], "", "Easy", [["type","button"]]);
			easyBtn.onclick = function() {game.init(0);};
			var midBtn = handleDOM.createEl("button", ["btn", "btn-warning"], "", "Mid", [["type","button"]]);
			midBtn.onclick = function() {game.init(1);};
			var hardBtn = handleDOM.createEl("button", ["btn", "btn-danger"], "", "Hard", [["type","button"]]);
			hardBtn.onclick = function() {game.init(2);};
			var atomicBtn = handleDOM.createEl("button", ["btn", "btn-success"], "", "Atomic", [["type","button"]]);
			atomicBtn.onclick = function() {game.init(3);};

			arenaModeFlex.appendChild(easyBtn);
			arenaModeFlex.appendChild(midBtn);
			arenaModeFlex.appendChild(hardBtn);
			arenaModeFlex.appendChild(atomicBtn);

			cidArenaMode.appendChild(arenaModeFlex);
			this.parentEl.appendChild(cidArenaMode);
		},

		displayCover: function() {
			var cidArena = handleDOM.clearEl("cid_arena");
			var cidArenaCover = handleDOM.createEl("div", ["cid-arena-cover"], "cid_arena_cover");

			var arenaCoverImg = handleDOM.createEl("img", ["arena-cover-img"], "arena_cover_img", "",
																						 [["alt","Metal Cover"]]);
			arenaCoverImg.src = "assets/images/cover-sticker.jpg";

			var arenaCoverInfo = handleDOM.createEl("div", ["arena-cover-info"], "arena_cover_info");
			var coverInfoText1 = handleDOM.createEl("p", ["cover-info-text1"], "", "Mode: ");
			var infoText1Span = handleDOM.createEl("span", [], "cover_info_text1");
			coverInfoText1.appendChild(infoText1Span);
			arenaCoverInfo.appendChild(coverInfoText1);

			var coverInfoText2 = handleDOM.createEl("p", ["cover-info-text2"], "", "Elements Remaining: ");
			var infoText2Span = handleDOM.createEl("span", [], "cover_info_text2");
			coverInfoText2.appendChild(infoText2Span);
			arenaCoverInfo.appendChild(coverInfoText2);

			var coverCardBox = handleDOM.createEl("div", ["cover-card-box"], "cover_card_box");

			cidArenaCover.appendChild(arenaCoverImg);
			cidArenaCover.appendChild(arenaCoverInfo);
			cidArenaCover.appendChild(coverCardBox);
			this.parentEl.appendChild(cidArenaCover);
		},

		displayResult: function(statNum) {
			var cidArenaResult = handleDOM.createEl("div", ["cid-arena-result"], "cid_arena_result");
			var arenaResultGif = handleDOM.createEl("iframe", ["giphy-embed", "arena-result-info"], "arena_result_gif", "", 
																							[["frameBorder","0"]]);
			arenaResultGif.src = "https://giphy.com/embed/c7kqZMtzMLpG8";//delete

			var arenaResultInfo = handleDOM.createEl("div", ["arena-result-info"], "arena_result_info");
			var resultInfoText = handleDOM.createEl("p", ["result-info-text"], "result_info_text");
			var resultInfoBtn = handleDOM.createEl("button", ["btn", "btn-warning", "result-info-btn"], "result_info_btn");
			resultInfoBtn.onclick = function() {game.resetGameVars(statNum);};

			arenaResultInfo.appendChild(resultInfoText);
			arenaResultInfo.appendChild(resultInfoBtn);

			cidArenaResult.appendChild(arenaResultGif);
			cidArenaResult.appendChild(arenaResultInfo);
			this.parentEl.appendChild(cidArenaResult);
		},

		closeCover: function() {
			this.displayCover();

			var coverCardBox = document.getElementById("cover_card_box");
			coverCardBox.innerHTML = "";

			var arenaCoverInfo = document.getElementById("arena_cover_info");
			arenaCoverInfo.style.visibility = "visible";

			var cidArenaCover = document.getElementById("cid_arena_cover");
			cidArenaCover.classList.remove('open-animate');
			cidArenaCover.classList.add('cover-animate');

			//display to arena cover
		  var coverInfoText1 = document.getElementById("cover_info_text1");
		  coverInfoText1.innerHTML += mode.desig;
		  coverInfoText1.style.color = mode.color;

		  this.updateCover();
		},

		openCover: function(statNum) {
			this.displayResult(statNum);

			//remove schrodinger background
			var cidArena = document.getElementById("cid_arena");
		  cidArena.style.backgroundImage = "none";

			//depending on win or loss display different text and gifs
			var arenaResultGif = document.getElementById("arena_result_gif");
			var resultInfoText = document.getElementById("result_info_text");
		  var resultInfoBtn = document.getElementById("result_info_btn");

		  //get game results
		  var result = game.genResult(statNum);
	    result.song();
			arenaResultGif.src = result.gif;
			resultInfoText.innerHTML = result.comment;
	    resultInfoBtn.innerHTML = result.btn;
	    resultInfoBtn.value = result.desig;	  

			//animate opening of cover
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
			coverInfoText2.innerHTML = sets.elementSubSet.length;
		},

		displayCards: function() {
			var wfnArray = game.genWfn();

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
			
			arenaCoverInfo.style.visibility = "hidden";
			lett.instructions("Find the cat! Pick a card.");

			var cardRowTop = handleDOM.createEl("div", ["card-row"], "card_row_top");
			var flipContainerTop = handleDOM.createEl("div", ["flip-container"], "top");
			flipContainerTop.onclick = function() {arena.flipCards('top',wfnArray);};
			var flipperCardTop = handleDOM.createEl("div", ["flipper","card"], "card_top_center");
			var frontTop = handleDOM.createEl("div", ["front"], "", "?");
			var backTop = handleDOM.createEl("div", ["back"], "", topImg);
			flipperCardTop.appendChild(frontTop);
			flipperCardTop.appendChild(backTop);
			flipContainerTop.appendChild(flipperCardTop);
			cardRowTop.appendChild(flipContainerTop);

			var flipContainerLeft = handleDOM.createEl("div", ["flip-container"], "left");
			flipContainerLeft.onclick = function() {arena.flipCards('left',wfnArray);};
			var flipperCardLeft = handleDOM.createEl("div", ["flipper","card"], "card_middle_left");
			var frontLeft = handleDOM.createEl("div", ["front"], "", "?");
			var backLeft = handleDOM.createEl("div", ["back"], "", leftImg);
			flipperCardLeft.appendChild(frontLeft);
			flipperCardLeft.appendChild(backLeft);
			flipContainerLeft.appendChild(flipperCardLeft);

			var flipContainerRight = handleDOM.createEl("div", ["flip-container"], "right");
			flipContainerRight.onclick = function() {arena.flipCards('right',wfnArray);};
			var flipperCardRight = handleDOM.createEl("div", ["flipper","card"], "card_middle_right");
			var frontRight = handleDOM.createEl("div", ["front"], "", "?");
			var backRight = handleDOM.createEl("div", ["back"], "", rightImg);
			flipperCardRight.appendChild(frontRight);
			flipperCardRight.appendChild(backRight);
			flipContainerRight.appendChild(flipperCardRight);

			var cardRowMiddle = handleDOM.createEl("div", ["card-row"], "card_row_middle");
			cardRowMiddle.appendChild(flipContainerLeft);
			cardRowMiddle.appendChild(flipContainerRight);

			var cardRowBot = handleDOM.createEl("div", ["card-row"], "card_row_bottom");
			var flipContainerBot = handleDOM.createEl("div", ["flip-container"], "bot");
			flipContainerBot.onclick = function() {arena.flipCards('bot',wfnArray);};
			var flipperCardBot = handleDOM.createEl("div", ["flipper","card"], "card_bottom_center");
			var frontBot = handleDOM.createEl("div", ["front"], "", "?");
			var backBot = handleDOM.createEl("div", ["back"], "", botImg);
			flipperCardBot.appendChild(frontBot);
			flipperCardBot.appendChild(backBot);
			flipContainerBot.appendChild(flipperCardBot);
			cardRowBot.appendChild(flipContainerBot);

			coverCardBox.appendChild(cardRowTop);
			coverCardBox.appendChild(cardRowMiddle);
			coverCardBox.appendChild(cardRowBot);
		},

		flipCards: function(cardSel, wfn) {
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
				if (wfn[0] === 1) {
					result = 2;
				}
				else {
					result = 1;
				}
			}
			else if (cardSel === "left") {
				cardLeft.style.boxShadow = "0px 10px 50px green";
				if (wfn[1] === 1) {
					result = 2;
				}
				else {
					result = 1;
				}
			}
			else if (cardSel === "right") {
				cardRight.style.boxShadow = "0px 10px 50px green";
				if (wfn[2] === 1) {
					result = 2;
				}
				else {
					result = 1;
				}
			}
			else {
				cardBottom.style.boxShadow = "0px 10px 50px green";
				if (wfn[3] === 1) {
					result = 2;
				}
				else {
					result = 1;
				}
			}
			arena.openCover(result);
		}
};

//Object containing all actions related to sound/audio
var sound = {
		srcWin: "assets/audio/periodic-song.mp3",
		srcLoss: "assets/audio/funeral-song.mp3",
		srcMeow: "assets/audio/meow.mp3",
		srcBell: "assets/audio/bell.mp3",
		srcClonk: "assets/audio/clonk.mp3",
		song: function(status) {
			var audio = document.getElementById("song_holder");
			if (status === "win") {
				audio.src = this.srcWin;
			} 
			else {
				audio.src = this.srcLoss;
			}
			audio.play();
		},
		fx: function(status) {
			var audio = document.getElementById("fx_holder");
			if (status === "correct") {
				audio.src = this.srcMeow;
			}
			else {
				audio.src = this.srcClonk;
			}
			audio.play();
		},
		allOff: function() {
    	var audios = document.getElementsByTagName("audio");
    	for(var i = 0; i < audios.length; i++){
          audios[i].pause();
    	}
		}
};

var handleDOM = {
		//this method will return an element with arbitrary classes and an id
		createEl: function(tag, cl, id, text, at) {
			var el = document.createElement(tag);
			if (typeof cl != 'undefined') {
				for (var i = 0; i < cl.length; i++) {
					el.className += " " + cl[i];
				}
			}
			if (typeof id != 'undefined') {
				el.setAttribute("id", id);
			}
			if (typeof text != 'undefined') {
				el.innerHTML = text;
			}
			//set arbitrary amounts of attributes
			if (typeof at != 'undefined') {
				for (var i = 0; i < at.length; i++) {
					el.setAttribute(at[i][0], at[i][1]);
				}
			}
			return el;
		},

		//this method will clear the inner html of an element
		clearEl: function(id) {
			var el = document.getElementById(id);
			el.innerHTML = "";
			return el;
		}
}
