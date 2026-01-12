

var buttons = document.querySelectorAll(".animal");
var currentAudio;

// --------------------
// 1) Background music + set images (on load)
// --------------------
window.addEventListener("load", function () {
  var bgAudio = new Audio("./sounds/bg.mp3");
  bgAudio.volume = 0.3;
  bgAudio.loop = true;
  bgAudio.play().catch(function () {});

  // Set background image for each animal button from data-img
  for (var i = 0; i < buttons.length; i++) {
    var imgFile = buttons[i].getAttribute("data-img");
    // If data-img is empty - skip (prevents broken url)
    if (imgFile) {
      buttons[i].style.backgroundImage = 'url("./images/' + imgFile + '")';
      buttons[i].style.backgroundSize = "cover";
      buttons[i].style.backgroundPosition = "center";
    }
  }

  /* =========================================================
     *** EXTRA ELEMENT (NOT LEARNED IN CLASS): localStorage ***
     Saves data in the browser even after refresh/close.
     Here we READ the last played key (if exists).
     ========================================================= */
  var last = localStorage.getItem("lastPlayedAnimal");
  if (last) {
    console.log("Last played (from localStorage): " + last);
  }
});

// -------------------------
// 2) Mouse click listeners
// -------------------------
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var key = this.innerHTML.toLowerCase();

    makeSound(key);
    buttonAnimation(key);

    /* =========================================================
       *** EXTRA ELEMENT (NOT LEARNED IN CLASS): localStorage ***
       SAVE last played key (remains after refresh).
       ========================================================= */
    localStorage.setItem("lastPlayedAnimal", key);
  });
}

// --------------------------
// 3) Keyboard press listener
// --------------------------
document.addEventListener("keypress", function (event) {
  var key = event.key.toLowerCase();

  makeSound(key);
  buttonAnimation(key);

  /* =========================================================
     *** EXTRA ELEMENT (NOT LEARNED IN CLASS): localStorage ***
     SAVE last played key (remains after refresh).
     ========================================================= */
  localStorage.setItem("lastPlayedAnimal", key);
});

// -----------------------------------
// 4) Play sound by key (switch-case)
// -----------------------------------
function makeSound(key) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  switch (key) {
    case "w":
      currentAudio = new Audio("./sounds/chicken.mp3");
      break;
    case "a":
      currentAudio = new Audio("./sounds/dog.mp3");
      break;
    case "s":
      currentAudio = new Audio("./sounds/duck.mp3");
      break;
    case "d":
      currentAudio = new Audio("./sounds/elephant.mp3");
      break;
    case "j":
      currentAudio = new Audio("./sounds/frog.mp3");
      break;
    case "k":
      currentAudio = new Audio("./sounds/lion.mp3");
      break;
    case "l":
      currentAudio = new Audio("./sounds/monkey.mp3");
      break;
    default:
      return;
  }

  currentAudio.play();
}

// ----------------------------------------
// 5) Animation: add/remove "pressed" class
// ----------------------------------------
function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  if (!activeButton) return;

  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 150);
}
