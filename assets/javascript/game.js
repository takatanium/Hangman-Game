//Global constant variables
var letters  = "abcdefghijklmnopqrstuvwxyz";
var elements = [ ["H", 1, "hydrogen"],
                 ["He", 2, "helium"],
                 ["Li", 3, "lithium"],
                 ["Be", 4, "beryllium"],
                 ["B", 5, "boron"],
                 ["C", 6, "carbon"],
                 ["N", 7, "nitrogen"],
                 ["O", 8, "oxygen"],
                 ["F", 9, "fluorine"],
                 ["Ne", 10, "neon"],
                 ["Na", 11, "sodium"],
                 ["Mg", 12, "magnesium"],
                 ["Al", 13, "aluminum"],
                 ["Si", 14, "silicon"],
                 ["P", 15, "phosphorus"],
                 ["S", 16, "sulfur"],
                 ["Cl", 17, "chlorine"],
                 ["Ar", 18, "argon"],
                 ["K", 19, "potassium"],
                 ["Ca", 20, "calcium"],
                 ["Sc", 21, "scandium"],
                 ["Ti", 22, "titanium"],
                 ["V", 23, "vanadium"],
                 ["Cr", 24, "chromium"],
                 ["Mn", 25, "manganese"],
                 ["Fe", 26, "iron"],
                 ["Co", 27, "cobalt"],
                 ["Ni", 28, "nickel"],
                 ["Cu", 29, "copper"],
                 ["Zn", 30, "zinc"],
                 ["Ga", 31, "gallium"],
                 ["Ge", 32, "germanium"],
                 ["As", 33, "arsenic"],
                 ["Se", 34, "selenium"],
                 ["Br", 35, "bromine"],
                 ["Kr", 36, "krypton"],
                 ["Rb", 37, "rubidium"],
                 ["Sr", 38, "strontium"],
                 ["Y", 39, "yttrium"],
                 ["Zr", 40, "zirconium"],
                 ["Nb", 41, "niobium"],
                 ["Mo", 42, "molybdenum"],
                 ["Tc", 43, "technetium"],
                 ["Ru", 44, "ruthenium"],
                 ["Rh", 45, "rhodium"],
                 ["Pd", 46, "palladium"],
                 ["Ag", 47, "silver"],
                 ["Cd", 48, "cadmium"],
                 ["In", 49, "indium"],
                 ["Sn", 50, "tin"],
                 ["Sb", 51, "antimony"],
                 ["Te", 52, "tellurium"],
                 ["I", 53, "iodine"],
                 ["Xe", 54, "xenon"],
                 ["Cs", 55, "cesium"],
                 ["Ba", 56, "barium"],
                 ["La", 57, "lanthanum"],
                 ["Ce", 58, "cerium"],
                 ["Pr", 59, "praseodymium"],
                 ["Nd", 60, "neodymium"],
                 ["Pm", 61, "promethium"],
                 ["Sm", 62, "samarium"],
                 ["Eu", 63, "europium"],
                 ["Gd", 64, "gadolinium"],
                 ["Tb", 65, "terbium"],
                 ["Dy", 66, "dysprosium"],
                 ["Ho", 67, "holmium"],
                 ["Er", 68, "erbium"],
                 ["Tm", 69, "thulium"],
                 ["Yb", 70, "ytterbium"],
                 ["Lu", 71, "lutetium"],
                 ["Hf", 72, "hafnium"],
                 ["Ta", 73, "tantalum"],
                 ["W", 74, "tungsten"],
                 ["Re", 75, "rhenium"],
                 ["Os", 76, "osmium"],
                 ["Ir", 77, "iridium"],
                 ["Pt", 78, "platinum"],
                 ["Au", 79, "gold"],
                 ["Hg", 80, "mercury"],
                 ["Tl", 81, "thallium"],
                 ["Pb", 82, "lead"],
                 ["Bi", 83, "bismuth"],
                 ["Po", 84, "polonium"],
                 ["At", 85, "astatine"],
                 ["Rn", 86, "radon"],
                 ["Fr", 87, "francium"],
                 ["Ra", 88, "radium"],
                 ["Ac", 89, "actinium"],
                 ["Th", 90, "thorium"],
                 ["Pa", 91, "protactinium"],
                 ["U", 92, "uranium"],
                 ["Np", 93, "neptunium"],
                 ["Pu", 94, "plutonium"],
                 ["Am", 95, "americium"],
                 ["Cm", 96, "curium"],
                 ["Bk", 97, "berkelium"],
                 ["Cf", 98, "californium"],
                 ["Es", 99, "eisteinium"],
                 ["Fm", 100, "fermium"],
                 ["Md", 101, "mendelevium"],
                 ["No", 102, "nobelium"],
                 ["Lr", 103, "lawrencium"],
                 ["Rf", 104, "rutherfordium"],
                 ["Db", 105, "dubnium"],
                 ["Sg", 106, "seaborgium"],
                 ["Bh", 107, "bohrium"],
                 ["Hs", 108, "hassium"],
                 ["Mt", 109, "meitnerium"],
               ];

var maxAttempts = 5;

//Reset at start of new game
var wins;
var losses; 

//Reset at start of new element
var userGuess = []; 
var correctGuess = [];
var elementString = "";
var stopGame = false;

//Indicates very first game
var elementIndexPicked = -1;

document.addEventListener('keyup', function(event) {
  if (elementIndexPicked === -1) { //initiate the first game
    initiateGame();
  }
  else { //in game play
    captureKeyEvent(event);
  }
});

//Game initiation, reset all variable and pick an element
function initiateGame() {
  //Reset variables
  wins = 0;
  losses = 0;

  startNewElement();
}

function startNewElement() {
  //Reset variables
  userGuess = [];
  correctGuess = [];
  elementString = "";
  stopGame = false;

  //generate and display element
  elementIndexPicked = generateElement();
  displayElement(elementIndexPicked);
}

//Random generation of element index
function generateElement() {
  var elementIndex = Math.floor(Math.random() * elements.length);

  elementString = elements[elementIndex][2]; //save element string

  //Display atomic symbol to screen
  var symbolText = document.getElementById("symbol");
  symbolText.innerHTML = elements[elementIndex][0];

  return elementIndex;
}

function displayElement(index) {
  var elementText = document.getElementById("element");

  blankedText = "";

  if (correctGuess.length === 0) {
    for (var i = 0; i < elements[index][2].length; i++) {
      blankedText += "_ ";
    }
  }

  else {
    for (var i = 0; i < elements[index][2].length; i++) {
      for (var j = 0; j < correctGuess.length; j++) {
        if (elements[index][2][i] === correctGuess[j]) {
          blankedText += correctGuess[j].toUpperCase() + " ";
          break;
        }
        if (j == correctGuess.length - 1) {
          blankedText += "_ ";
        }
      }
    }
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
    guessText.innerHTML = "Guessed: " + guessChars;
  }
}

function compareGuess(let) {

  if (elements[elementIndexPicked][2].match(let)) {
    correctGuess.push(let); //push letter to correct guess array
    elementString = elementString.replace(new RegExp(let, 'g'), "");
    return true;
  }
  return false;
}

function displayHistory() {
  var winText = document.getElementById("wins");
  var lossText = document.getElementById("losses");
  winText.innerHTML = wins;
  lossText.innerHTML = losses;
}

//Main gameplay interaction, keyboard events
function captureKeyEvent(event) {

  if(event.keyCode >= 65 && event.keyCode <= 90) { //ensure only letters
    var letterIndex = event.keyCode - 65; //define the index of the keycode
    var keyChar = letters.charAt(letterIndex);

    if (userGuess.indexOf(keyChar) === -1) { //ensure only unique guesses
      userGuess.push(keyChar); //add letter to user guess array

      if (compareGuess(keyChar)) { //compare to chosen element string
        if (elementString.length === 0) { //check if won
          wins++;
          stopGame = true;
          startNewElement();
        }
      }
      else {
        if ((userGuess.length - correctGuess.length) === maxAttempts) {
          losses++;
          stopGame = true;
          startNewElement();
        }
      }
    }
    else {
      console.log("Already typed");
    }

    displayElement(elementIndexPicked);
    // displayHistory();
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

