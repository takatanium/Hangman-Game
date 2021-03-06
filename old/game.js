//Global constant variables
var letters  = "abcdefghijklmnopqrstuvwxyz";
var elements = [ hydrogen = {symbol:"H", number: 1, name:"hydrogen", wiki:"https://en.wikipedia.org/wiki/hydrogen"},
                 helium = {symbol:"He", number:2, name:"helium", wiki:"https://en.wikipedia.org/wiki/helium"},
                 lithium = {symbol:"Li", number:3, name:"lithium", wiki:"https://en.wikipedia.org/wiki/lithium"},
                 beryllium = {symbol:"Be", number:4, name:"beryllium", wiki:"https://en.wikipedia.org/wiki/beryllium"},
                 boron = {symbol:"B", number:5, name:"boron", wiki:"https://en.wikipedia.org/wiki/boron"},
                 carbon = {symbol:"C", number:6, name:"carbon", wiki:"https://en.wikipedia.org/wiki/carbon"},
                 nitrogen = {symbol:"N", number:7, name:"nitrogen", wiki:"https://en.wikipedia.org/wiki/nitrogen"},
                 oxygen = {symbol:"O", number:8, name:"oxygen", wiki:"https://en.wikipedia.org/wiki/oxygen"},
                 fluorine = {symbol:"F", number:9, name:"fluorine", wiki:"https://en.wikipedia.org/wiki/fluorine"},
                 neon = {symbol:"Ne", number:10, name:"neon", wiki:"https://en.wikipedia.org/wiki/neon"},
                 sodium = {symbol:"Na", number:11, name:"sodium", wiki:"https://en.wikipedia.org/wiki/sodium"},
                 magnesium = {symbol:"Mg", number:12, name:"magnesium", wiki:"https://en.wikipedia.org/wiki/magnesium"},
                 aluminum = {symbol:"Al", number:13, name:"aluminum", wiki:"https://en.wikipedia.org/wiki/aluminum"},
                 silicon = {symbol:"Si", number:14, name:"silicon", wiki:"https://en.wikipedia.org/wiki/silicon"},
                 phosphorus = {symbol:"P", number:15, name:"phosphorus", wiki:"https://en.wikipedia.org/wiki/phosphorus"},
                 sulfur = {symbol:"S", number:16, name:"sulfur", wiki:"https://en.wikipedia.org/wiki/sulfur"},
                 chlorine = {symbol:"Cl", number:17, name:"chlorine", wiki:"https://en.wikipedia.org/wiki/chlorine"},
                 argon = {symbol:"Ar", number:18, name:"argon", wiki:"https://en.wikipedia.org/wiki/argon"},
                 potassium = {symbol:"K", number:19, name:"potassium", wiki:"https://en.wikipedia.org/wiki/potassium"},
                 calcium = {symbol:"Ca", number:20, name:"calcium", wiki:"https://en.wikipedia.org/wiki/calcium"},
                 scandium = {symbol:"Sc", number:21, name:"scandium", wiki:"https://en.wikipedia.org/wiki/scandium"},
                 titanium = {symbol:"Ti", number:22, name:"titanium", wiki:"https://en.wikipedia.org/wiki/titanium"},
                 vanadium = {symbol:"V", number:23, name:"vanadium", wiki:"https://en.wikipedia.org/wiki/vanadium"},
                 chromium = {symbol:"Cr", number:24, name:"chromium", wiki:"https://en.wikipedia.org/wiki/chromium"},
                 manganese = {symbol:"Mn", number:25, name:"manganese", wiki:"https://en.wikipedia.org/wiki/manganese"},
                 iron = {symbol:"Fe", number:26, name:"iron", wiki:"https://en.wikipedia.org/wiki/iron"},
                 cobalt = {symbol:"Co", number:27, name:"cobalt", wiki:"https://en.wikipedia.org/wiki/cobalt"},
                 nickel = {symbol:"Ni", number:28, name:"nickel", wiki:"https://en.wikipedia.org/wiki/nickel"},
                 copper = {symbol:"Cu", number:29, name:"copper", wiki:"https://en.wikipedia.org/wiki/copper"},
                 zinc = {symbol:"Zn", number:30, name:"zinc", wiki:"https://en.wikipedia.org/wiki/zinc"},
                 gallium = {symbol:"Ga", number:31, name:"gallium", wiki:"https://en.wikipedia.org/wiki/gallium"},
                 germanium = {symbol:"Ge", number:32, name:"germanium", wiki:"https://en.wikipedia.org/wiki/germanium"},
                 arsenic = {symbol:"As", number:33, name:"arsenic", wiki:"https://en.wikipedia.org/wiki/arsenic"},
                 selenium = {symbol:"Se", number:34, name:"selenium", wiki:"https://en.wikipedia.org/wiki/selenium"},
                 bromine = {symbol:"Br", number:35, name:"bromine", wiki:"https://en.wikipedia.org/wiki/bromine"},
                 krypton = {symbol:"Kr", number:36, name:"krypton", wiki:"https://en.wikipedia.org/wiki/krypton"},
                 rubidium = {symbol:"Rb", number:37, name:"rubidium", wiki:"https://en.wikipedia.org/wiki/rubidium"},
                 strontium = {symbol:"Sr", number:38, name:"strontium", wiki:"https://en.wikipedia.org/wiki/strontium"},
                 yttrium = {symbol:"Y", number:39, name:"yttrium", wiki:"https://en.wikipedia.org/wiki/yttrium"},
                 zirconium = {symbol:"Zr", number:40, name:"zirconium", wiki:"https://en.wikipedia.org/wiki/zirconium"},
                 niobium = {symbol:"Nb", number:41, name:"niobium", wiki:"https://en.wikipedia.org/wiki/niobium"},
                 molybdenum = {symbol:"Mo", number:42, name:"molybdenum", wiki:"https://en.wikipedia.org/wiki/molybdenum"},
                 technetium = {symbol:"Tc", number:43, name:"technetium", wiki:"https://en.wikipedia.org/wiki/technetium"},
                 ruthenium = {symbol:"Ru", number:44, name:"ruthenium", wiki:"https://en.wikipedia.org/wiki/ruthenium"},
                 rhodium = {symbol:"Rh", number:45, name:"rhodium", wiki:"https://en.wikipedia.org/wiki/rhodium"},
                 palladium = {symbol:"Pd", number:46, name:"palladium", wiki:"https://en.wikipedia.org/wiki/palladium"},
                 silver = {symbol:"Ag", number:47, name:"silver", wiki:"https://en.wikipedia.org/wiki/silver"},
                 cadmium = {symbol:"Cd", number:48, name:"cadmium", wiki:"https://en.wikipedia.org/wiki/cadmium"},
                 indium = {symbol:"In", number:49, name:"indium", wiki:"https://en.wikipedia.org/wiki/indium"},
                 tin = {symbol:"Sn", number:50, name:"tin", wiki:"https://en.wikipedia.org/wiki/tin"},
                 antimony = {symbol:"Sb", number:51, name:"antimony", wiki:"https://en.wikipedia.org/wiki/antimony"},
                 tellurium = {symbol:"Te", number:52, name:"tellurium", wiki:"https://en.wikipedia.org/wiki/tellurium"},
                 iodine = {symbol:"I", number:53, name:"iodine", wiki:"https://en.wikipedia.org/wiki/iodine"},
                 xenon = {symbol:"Xe", number:54, name:"xenon", wiki:"https://en.wikipedia.org/wiki/xenon"},
                 cesium = {symbol:"Cs", number:55, name:"cesium", wiki:"https://en.wikipedia.org/wiki/cesium"},
                 barium = {symbol:"Ba", number:56, name:"barium", wiki:"https://en.wikipedia.org/wiki/barium"},
                 lanthanum = {symbol:"La", number:57, name:"lanthanum", wiki:"https://en.wikipedia.org/wiki/lanthanum"},
                 cerium = {symbol:"Ce", number:58, name:"cerium", wiki:"https://en.wikipedia.org/wiki/cerium"},
                 praseodymium = {symbol:"Pr", number:59, name:"praseodymium", wiki:"https://en.wikipedia.org/wiki/praseodymium"},
                 neodymium = {symbol:"Nd", number:60, name:"neodymium", wiki:"https://en.wikipedia.org/wiki/neodymium"},
                 promethium = {symbol:"Pm", number:61, name:"promethium", wiki:"https://en.wikipedia.org/wiki/promethium"},
                 samarium = {symbol:"Sm", number:62, name:"samarium", wiki:"https://en.wikipedia.org/wiki/samarium"},
                 europium = {symbol:"Eu", number:63, name:"europium", wiki:"https://en.wikipedia.org/wiki/europium"},
                 gadolinium = {symbol:"Gd", number:64, name:"gadolinium", wiki:"https://en.wikipedia.org/wiki/gadolinium"},
                 terbium = {symbol:"Tb", number:65, name:"terbium", wiki:"https://en.wikipedia.org/wiki/terbium"},
                 dysprosium = {symbol:"Dy", number:66, name:"dysprosium", wiki:"https://en.wikipedia.org/wiki/dysprosium"},
                 holmium = {symbol:"Ho", number:67, name:"holmium", wiki:"https://en.wikipedia.org/wiki/holmium"},
                 erbium = {symbol:"Er", number:68, name:"erbium", wiki:"https://en.wikipedia.org/wiki/erbium"},
                 thulium = {symbol:"Tm", number:69, name:"thulium", wiki:"https://en.wikipedia.org/wiki/thulium"},
                 ytterbium = {symbol:"Yb", number:70, name:"ytterbium", wiki:"https://en.wikipedia.org/wiki/ytterbium"},
                 lutetium = {symbol:"Lu", number:71, name:"lutetium", wiki:"https://en.wikipedia.org/wiki/lutetium"},
                 hafnium = {symbol:"Hf", number:72, name:"hafnium", wiki:"https://en.wikipedia.org/wiki/hafnium"},
                 tantalum = {symbol:"Ta", number:73, name:"tantalum", wiki:"https://en.wikipedia.org/wiki/tantalum"},
                 tungsten = {symbol:"W", number:74, name:"tungsten", wiki:"https://en.wikipedia.org/wiki/tungsten"},
                 rhenium = {symbol:"Re", number:75, name:"rhenium", wiki:"https://en.wikipedia.org/wiki/rhenium"},
                 osmium = {symbol:"Os", number:76, name:"osmium", wiki:"https://en.wikipedia.org/wiki/osmium"},
                 iridium = {symbol:"Ir", number:77, name:"iridium", wiki:"https://en.wikipedia.org/wiki/iridium"},
                 platinum = {symbol:"Pt", number:78, name:"platinum", wiki:"https://en.wikipedia.org/wiki/platinum"},
                 gold = {symbol:"Au", number:79, name:"gold", wiki:"https://en.wikipedia.org/wiki/gold"},
                 mercury = {symbol:"Hg", number:80, name:"mercury", wiki:"https://en.wikipedia.org/wiki/mercury"},
                 thallium = {symbol:"Tl", number:81, name:"thallium", wiki:"https://en.wikipedia.org/wiki/thallium"},
                 lead = {symbol:"Pb", number:82, name:"lead", wiki:"https://en.wikipedia.org/wiki/lead"},
                 bismuth = {symbol:"Bi", number:83, name:"bismuth", wiki:"https://en.wikipedia.org/wiki/bismuth"},
                 polonium = {symbol:"Po", number:84, name:"polonium", wiki:"https://en.wikipedia.org/wiki/polonium"},
                 astatine = {symbol:"At", number:85, name:"astatine", wiki:"https://en.wikipedia.org/wiki/astatine"},
                 radon = {symbol:"Rn", number:86, name:"radon", wiki:"https://en.wikipedia.org/wiki/radon"},
                 francium = {symbol:"Fr", number:87, name:"francium", wiki:"https://en.wikipedia.org/wiki/francium"},
                 radium = {symbol:"Ra", number:88, name:"radium", wiki:"https://en.wikipedia.org/wiki/radium"},
                 actinium = {symbol:"Ac", number:89, name:"actinium", wiki:"https://en.wikipedia.org/wiki/actinium"},
                 thorium = {symbol:"Th", number:90, name:"thorium", wiki:"https://en.wikipedia.org/wiki/thorium"},
                 protactinium = {symbol:"Pa", number:91, name:"protactinium", wiki:"https://en.wikipedia.org/wiki/protactinium"},
                 uranium = {symbol:"U", number:92, name:"uranium", wiki:"https://en.wikipedia.org/wiki/uranium"},
                 neptunium = {symbol:"Np", number:93, name:"neptunium", wiki:"https://en.wikipedia.org/wiki/neptunium"},
                 plutonium = {symbol:"Pu", number:94, name:"plutonium", wiki:"https://en.wikipedia.org/wiki/plutonium"},
                 americium = {symbol:"Am", number:95, name:"americium", wiki:"https://en.wikipedia.org/wiki/americium"},
                 curium = {symbol:"Cm", number:96, name:"curium", wiki:"https://en.wikipedia.org/wiki/curium"},
                 berkelium = {symbol:"Bk", number:97, name:"berkelium", wiki:"https://en.wikipedia.org/wiki/berkelium"},
                 californium = {symbol:"Cf", number:98, name:"californium", wiki:"https://en.wikipedia.org/wiki/californium"},
                 einsteinium = {symbol:"Es", number:99, name:"einsteinium", wiki:"https://en.wikipedia.org/wiki/einsteinium"},
                 fermium = {symbol:"Fm", number:100, name:"fermium", wiki:"https://en.wikipedia.org/wiki/fermium"},
                 mendelevium = {symbol:"Md", number:101, name:"mendelevium", wiki:"https://en.wikipedia.org/wiki/mendelevium"},
                 nobelium = {symbol:"No", number:102, name:"nobelium", wiki:"https://en.wikipedia.org/wiki/nobelium"},
                 lawrencium = {symbol:"Lr", number:103, name:"lawrencium", wiki:"https://en.wikipedia.org/wiki/lawrencium"},
                 rutherfordium = {symbol:"Rf", number:104, name:"rutherfordium", wiki:"https://en.wikipedia.org/wiki/rutherfordium"},
                 dubnium = {symbol:"Db", number:105, name:"dubnium", wiki:"https://en.wikipedia.org/wiki/dubnium"},
                 seaborgium = {symbol:"Sg", number:106, name:"seaborgium", wiki:"https://en.wikipedia.org/wiki/seaborgium"},
                 bohrium = {symbol:"Bh", number:107, name:"bohrium", wiki:"https://en.wikipedia.org/wiki/bohrium"},
                 hassium = {symbol:"Hs", number:108, name:"hassium", wiki:"https://en.wikipedia.org/wiki/hassium"},
                 meitnerium = {symbol:"Mt", number:109, name:"meitnerium", wiki:"https://en.wikipedia.org/wiki/meitnerium"}
               ];

var maxAttempts = 3;
var maxLosses = 4;
var gameMode = [ [18, "Easy", "#5bc0de"], //easy mode
						     [54, "Medium", "#f0ad4e"], //medium mode
						     [109, "Hard", "#d9534f"], //hard mode
						     [109, "Atomic", "#5cb85c"], //atomic mode
						     [5, "Debug", "#000000"] //debug mode
               ];

//Ending gifs
var winGif = "https://giphy.com/embed/c7kqZMtzMLpG8";
var winComment = "Awesome!";
var deathGif = "https://giphy.com/embed/ZWZMwJtoqAzxS";
var deathComment = "Playing dead?";
var luckGif = "https://giphy.com/embed/fliBUx4ZFB6HS";
var luckComment = "Lucky kitty!";

//Reset at start of new game
var mode = 1; //default to easy mode
var wins;
var losses;
var collapseWFN;
var elementSubSet = [];
var elementPastSet = [];

//Reset at start of new element
var userGuess = []; 
var correctGuess = [];
var elementString = "";
var stopGame = false;

//Indicates very first game
var elementIndex = -1;
var elementPicked = "";

//toggles
var toggleSymbol = true;

//event listeners
document.addEventListener('keyup', function(event) {
  if (elementPicked === "" && elementIndex === -1) { //initiate the first game
  	if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5") {
    	initiateGame(event.key-1);
  	}
    //close box
  }
  else if (stopGame) {
    startNewElement();
    updateProgressBar();
    displayInstructions("none");
    stopGame = false;
  }
  else { //in game play
    captureKeyEvent(event);
  }
});

//Game initiation, reset all variable and pick an element
function initiateGame(mode) {
  //Reset variables
  wins = 0;
  losses = 0;
  collapseWFN = 0;
  elementSubSet = [];
  elementPastSet = [];

  if (mode === 3) { //atomic mode uses atomic numbers
  	toggleSymbol = false;
  }
  else {
  	toggleSymbol = true;
  }

  var whichModeText = document.getElementById("which_mode");
  var remainingText = document.getElementById("remaining_elements");

  //push subset of elementList into elements
  for (var j = 0; j < gameMode[mode][0]; j++) {
  	elementSubSet.push(elements[j]);
  }

  whichModeText.innerHTML = gameMode[mode][1];
  whichModeText.style.color = gameMode[mode][2];
  remainingText.innerHTML = gameMode[mode][0];

  closeCover();
  startNewElement();
}

function startNewElement() {
  //Reset variables
  userGuess = [];
  correctGuess = [];
  elementString = "";
  stopGame = false;

  //generate and display element
  generateElement();
  displayElement(0);
}

//Random generation of element index
function generateElement() {
  elementIndex = Math.floor(Math.random() * elementSubSet.length);

  elementString = elementSubSet[elementIndex].name; //save element string
  elementPicked = elementSubSet[elementIndex]; //save element object

  //Display atomic symbol to screen
  var symbolText = document.getElementById("symbol");
  if (toggleSymbol) {
  	symbolText.innerHTML = elementPicked.symbol;
	}
	else {
  	symbolText.innerHTML = elementPicked.number;
	}

  return elementIndex;
}

function displayElement(status) {
  var elementText = document.getElementById("element");

  blankedText = "";
  elementText.style.color = "black";
  
  if (status === 0) {
    if (correctGuess.length === 0) {
      for (var i = 0; i < elementPicked.name.length; i++) {
        blankedText += "_ ";
      }
    }

    else {
      for (var i = 0; i < elementPicked.name.length; i++) {
        for (var j = 0; j < correctGuess.length; j++) {
          if (elementPicked.name[i] === correctGuess[j]) {
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
    for (var i = 0; i < elementPicked.name.length; i++) {
      blankedText += elementPicked.name[i].toUpperCase() + " ";
    }
    elementText.style.color = "red"; 
  }

  elementText.innerHTML = blankedText;
}

function displayGuess() {
  var guessChars = "";
  var guessText = document.getElementById("guess_bar");

  for (var i = 0; i < userGuess.length; i++) {
    if (correctGuess.indexOf(userGuess[i]) === -1) {
      guessChars += userGuess[i].toUpperCase() + " ";
    }
  }

  if (guessChars.length > 0) {
    guessText.innerHTML = guessChars;
  }
  else {
    guessText.innerHTML = "";
  }
}

function compareGuess(let) {
  if (elementPicked.name.match(let)) {
    correctGuess.push(let); //push letter to correct guess array
    elementString = elementString.replace(new RegExp(let, 'g'), "");
    return true;
  }
  return false;
}

//randomizer to determine death of cat
function collapseWfn() {
	var wfn = Math.floor(Math.random() * 10);

	if (wfn < 4) {
		return "uncertain";
	}

	return "lost";
}

//Main gameplay interaction, keyboard events
function captureKeyEvent(event) {

  if (event.keyCode >= 65 && event.keyCode <= 90) { //ensure only letters
    var letterIndex = event.keyCode - 65; //define the index of the keycode
    var keyChar = letters.charAt(letterIndex);

    if (userGuess.indexOf(keyChar) === -1) { //ensure only unique guesses
      userGuess.push(keyChar); //add letter to user guess array

      if (compareGuess(keyChar)) { //compare to chosen element string
        if (elementString.length === 0) { //check if won
          wins++;
          stopGame = true;
          playSound("correct");
          displayInstructions("getNew");
          shiftElements(true);
          updateLossBar();

          //check if anymore elements
    			if (elementSubSet.length === 0) {
    				openCover("win");
    			}
        }
        displayElement(0);
      }
      else {
        if ((userGuess.length - correctGuess.length) === maxAttempts) {
          losses++;
          stopGame = true;
          playSound("wrong");
          displayInstructions("getNew");
          updateLossBar();
          displayElement(1);
          shiftElements(false);

          //check if reached max losses
          if (losses === maxLosses) {
          	openCover(collapseWfn());
          }
    			else if (elementSubSet.length === 0) {
    				openCover("win");
    			}
        }
        else {
        displayElement(0);
        }
      }
    }
    else {
      console.log("Already typed");
    }

    updateProgressBar();
  }
}

function updateProgressBar() {
  var guessBar = document.getElementById("guess_bar");
  var guessPercent = ((userGuess.length - correctGuess.length) / maxAttempts) * 100;
  var guessStringPercent = guessPercent + '%';
  guessBar.style.width = guessStringPercent;

  displayGuess();
}

function updateLossBar() {
  var lossBar = document.getElementById("loss_bar");
  var lossPercent = (losses / maxLosses) * 100;
  var lossStringPercent = lossPercent + '%';
  lossBar.style.width = lossStringPercent;
  lossBar.innerHTML = lossStringPercent;
}

function printElements() {
	var listElements = document.getElementById("element_past");
	listElements.innerHTML = "";

	var symOrNum;

	for (var i = 0; i < elementPastSet.length; i++) {
		if (toggleSymbol) {
			symOrNum = elementPastSet[i][0].symbol;
		}
		else {
			symOrNum = elementPastSet[i][0].number;
		}

		if (elementPastSet[i][1] === false) { //guessed incorrectly
			listElements.innerHTML += "<a href=" 
		                         + elementPastSet[i][0].wiki 
		                         + " target='_blank' class='list-group-item list-group-item-danger'>"
		                         + symOrNum + ":" 
		                         + capFirst(elementPastSet[i][0].name) + "</a>";
		}
		else {
			listElements.innerHTML += "<a href=" 
		                         + elementPastSet[i][0].wiki 
		                         + " target='_blank' class='list-group-item'>"
		                         + symOrNum + ":" 
		                         + capFirst(elementPastSet[i][0].name) + "</a>";
		}
	}

	//decrease remaining element
  var remainingText = document.getElementById("remaining_elements");
	remainingText.innerHTML = elementSubSet.length;
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shiftElements(correctGuess) {
	//push element object into past set
	elementPastSet.push([elementPicked, correctGuess]);

	//remove element from sub set
	elementSubSet.splice(elementIndex, 1);

	printElements(); //print elements to screen
}

//This is done at start of game or if cat survives
function closeCover() {
	document.getElementById("difficulty_box").style.visibility = "hidden";
	
	var cover = document.getElementById("cover_box");
	cover.classList.remove('open-animate');
	cover.classList.add('cover-animate');
}

//This is done if radioactive meter reaches 100%
function openCover(status) {
	elementPicked = ""; //make sure keyboard cannot be used

	//remove schrodinger background
	var animationBox = document.getElementById("animation_box");
	animationBox.style.backgroundImage = "none";

	//depending on win or loss display different text and gifs
	var gifImage = document.getElementById("game_done");
	var resultText = document.getElementById("result_text");
	if (status === "lost") {
		gifImage.src = deathGif;
		resultText.innerHTML = deathComment;
	}
	else if (status === "uncertain") {
		gifImage.src = luckGif;
		resultText.innerHTML = luckComment;
	}
	else { //this is a overall win
		gifImage.src = winGif;
		resultText.innerHTML = winComment;
	}

	//animate opening of cover
	document.getElementById("difficulty_box").style.visibility = "hidden";
	var cover = document.getElementById("cover_box");
	cover.classList.remove('close-animate');
	cover.classList.add('open-animate');

	//display background-content box
	var backgroundContent = document.getElementById("background_content");
	backgroundContent.style.visibility = "visible";
}

function displayInstructions(instr) {
	var instructText = document.getElementById("instructions");
	if (instr === "getNew") {
		instructText.innerHTML = "Press any key for next element.";
	}
	else {
		instructText.innerHTML = "";
	}
}

function playSound(status) {
	if (status === "correct") {
		var sound = document.getElementById("bell_sound");
    sound.play();
	}
	else {
		var sound = document.getElementById("clonk_sound");
    sound.play();
	}
}

function resetGame() {

	//hide background content
	var backgroundContent = document.getElementById("background_content");
	backgroundContent.style.visibility = "hidden";

	//replace schrodinger background
	var animationBox = document.getElementById("animation_box");
		animationBox.style.backgroundImage = "url('assets/images/schrodingers-cat.png')";

	//show difficulty box
	var difficultyBox = document.getElementById("difficulty_box");
	difficultyBox.style.visibility = "visible";

	//remove elements in list
	elementPastSet = [];
	printElements();

	//remove guess element
	var elemText = document.getElementById("element");
	elemText.innerHTML = "";

	//remove symbol
	var symText = document.getElementById("symbol");
	symText.innerHTML = "";

	//reset loss gauges
	elementIndex = -1
	losses = 0;
	wins = 0;
	userGuess = [];
	correctGuess = [];
	updateLossBar();
	updateProgressBar();
}