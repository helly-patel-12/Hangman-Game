const wordList = [
 { word: "guitar", hint: "A musical instrument with strings." },
 { word: "oxygen", hint: "A colorless, odorless gas essential for life." },
 { word: "rainbow", hint: "A meteorological phenomenon caused by light refraction." },
 { word: "mountain", hint: "A large natural elevation of the Earth's surface." },
 { word: "painting", hint: "An art form using colors on a surface to create images or expression." },
 { word: "astronomy", hint: "The scientific study of celestial objects and phenomena." },
 { word: "football", hint: "A popular sport played with a spherical ball." },
 { word: "chocolate", hint: "A sweet treat made from cocoa beans." },
 { word: "butterfly", hint: "An insect with colorful wings and a slender body." },
 { word: "history", hint: "The study of past events and human civilization."}, 
 { word: "pizza", hint: "A savory dish consisting of a round, flattened base with toppings." },
 { word: "jazz", hint: "A genre of music characterized by improvisation and syncopation." },
 { word: "camera", hint: "A device used to capture and record images or videos." },
 { word: "diamond", hint: "A precious gemstone known for its brilliance and hardness." },
 { word: "adventure", hint: "An exciting or daring experience." },
 { word: "science", hint: "The systematic study of the structure and behavior of the physical and natural world." },
 { word: "bicycle", hint: "A human-powered vehicle with two wheels." },
 { word: "sunset", hint: "The daily disappearance of the sun below the horizon." },
 { word: "coffee", hint: "A popular caffeinated beverage made from roasted coffee beans." },
 { word: "dance", hint: "A rhythmic movement of the body often performed to music." },
 { word: "galaxy", hint: "A vast system of stars, gas, and dust held together by gravity." },
 { word: "orchestra", hint: "A large ensemble of musicians playing various instruments." },
 { word: "volcano", hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected." },
 { word: "novel", hint: "A long work of fiction, typically with a complex plot and characters." },
 { word: "sculpture", hint: "A three-dimensional art form created by shaping or combining materials." },
 { word: "symphony", hint: "A long musical composition for a full orchestra, typically in multiple movements." },
 { word: "architecture", hint: "The art and science of designing and constructing buildings." },
 { word: "ballet", hint: "A classical dance form characterized by precise and graceful movements." },
 { word: "astronaut", hint: "A person trained to travel and work in space."},
 { word: "waterfall", hint: "A cascade of water falling from a height." },
 { word: "technology", hint: "The application of scientific knowledge for practical purposes." },
 { word: "universe", hint: "All existing matter, space, and time as a whole." },
 { word: "piano", hint: "A musical instrument played by pressing keys that cause hammers to strike strings."}, 
 { word: "vacation", hint: "A period of time devoted to pleasure, rest, or relaxation." },
 { word: "rainforest", hint: "A dense forest characterized by high rainfall and biodiversity." },
 { word: "theater", hint: "A building or outdoor area in which plays, movies, or other performances are staged." },
 { word: "telephone", hint: "A device used to transmit sound over long distances." },
 { word: "language", hint: "A system of communication consisting of words, gestures, and syntax." },
 { word: "desert", hint: "A barren or arid land with little or no precipitation." },
 { word: "sunflower", hint: "A tall plant with a large yellow flower head." },
 { word: "fantasy", hint: "A genre of imaginative fiction involving magic and supernatural elements." },
 { word: "telescope", hint: "An optical instrument used to view distant objects in space." },
 { word: "breeze", hint: "A gentle wind." },
 { word: "oasis", hint: "A fertile spot in a desert where water is found." },
 { word: "photography", hint: "The art, process, or practice of creating images by recording light or other electromagnetic radiation." },
 { word: "safari", hint: "An expedition or journey, typically to observe wildlife in their natural habitat." },
 { word: "planet", hint: "A celestial body that orbits a star and does not produce light of its own." },
 { word: "river", hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another such stream." },
 { word: "tropical", hint: "Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn." },
 { word: "mysterious", hint: "Difficult or impossible to understand, explain, or identify." },
 { word: "enigma", hint: "Something that is mysterious, puzzling, or difficult to understand." },
 { word: "paradox", hint: "A statement or situation that contradicts itself or defies intuition." },
 { word: "puzzle", hint: "A game, toy, or problem designed to test ingenuity or knowledge." },
 { word: "whisper", hint: "To speak very softly or quietly, often in a secretive manner." },
 { word: "shadow", hint: "A dark area or shape produced by an object blocking the light." },
 { word: "secret", hint: "Something kept hidden or unknown to others." },
 { word: "curiosity", hint: "A strong desire to know or learn something." },
 { word: "unpredictable", hint: "Not able to be foreseen or known beforehand; uncertain." },
 { word: "obfuscate", hint: "To confuse or bewilder someone; to make something unclear or difficult to understand." },
 { word: "unveil", hint: "To make known or reveal something previously secret or unknown." },
 { word: "illusion", hint: "A false perception or belief; a deceptive appearance or impression." },
 { word: "moonlight", hint: "The light from the moon." },
 { word: "vibrant", hint: "Full of energy, brightness, and life." },
 { word: "nostalgia", hint: "A sentimental longing or wistful affection for the past." },
 { word: "brilliant", hint: "Exceptionally clever, talented, or impressive." },
];

const hangmanImage = document.getElementById("hangman-image");
const wordDisplay = document.getElementById("word-display");
const hintText = document.getElementById("hint-text");
const guessesText = document.getElementById("guesses-text");
const keyboardDiv = document.getElementById("keyboard");
const gameModal = document.getElementById("game-modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const resultImage = document.getElementById("result-image");
const playAgainBtn = document.getElementById("play-again");
const timeBarFill = document.querySelector(".time-bar-fill");
const resetBtn = document.getElementById("reset-btn");
const pauseBtn = document.getElementById("pause-btn");
const hintBtn = document.getElementById("hint-btn");

let currentWord = "";
let correctLetters = [];
let wrongGuessCount = 0;
const maxGuesses = 6;
let timer;
let remainingTime = 30;
let isPaused = false;

const resetGame = () => {
  clearInterval(timer);
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = randomWord.word;
  hintText.innerText = randomWord.hint;
  correctLetters = [];
  wrongGuessCount = 0;
  remainingTime = 30;

  hangmanImage.src = "images/hangman-0.svg";
  guessesText.innerText = `0 / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li></li>`).join("");
  createKeyboard();
  gameModal.classList.add("hidden");
  pauseBtn.innerText = "Pause";
  isPaused = false;
  startTimer();
};

const createKeyboard = () => {
  keyboardDiv.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => handleGuess(button));
    keyboardDiv.appendChild(button);
  }
};

const handleGuess = (button) => {
  const guessedLetter = button.innerText;
  button.disabled = true;

  if (currentWord.includes(guessedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === guessedLetter) {
        correctLetters.push(guessedLetter);
        wordDisplay.children[index].innerText = letter;
      }
    });
    if (correctLetters.length === currentWord.length) endGame(true);
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) endGame(false);
  }
};

const startTimer = () => {
  const updateProgressBar = () => {
    const percentage = (remainingTime / 30) * 100;
    timeBarFill.style.width = `${percentage}%`;

    if (remainingTime === 5) {
      alert("Hurry up! Only 5 seconds remaining!");
    }
  };

  updateProgressBar();

  timer = setInterval(() => {
    if (!isPaused) {
      remainingTime--;
      updateProgressBar();

      if (remainingTime === 0) {
        clearInterval(timer);
        endGame(false);
      }
    }
  }, 1000);
};

const togglePause = () => {
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? "Resume" : "Pause";
};

const showHint = () => {
  alert(`Hint: ${hintText.innerText}`);
};


const endGame = (isWin) => {
  clearInterval(timer);
  modalTitle.innerText = isWin ? "You Win!" : "Game Over!";
  modalMessage.innerText = isWin
    ? `Congratulations! The word was "${currentWord}".`
    : `You lost! The word was "${currentWord}".`;
  resultImage.src = isWin ? "images/victory.gif" : "images/lost.gif";
  gameModal.classList.remove("hidden");
};


// Event Listeners
playAgainBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", togglePause);
hintBtn.addEventListener("click", showHint);

resetGame();
