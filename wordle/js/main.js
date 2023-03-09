var validKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "backspace",
  "enter",
];

const letters = 5;
const lives = 6;
var word;
var guess = "";
var guessLetter = 0;
var chance;
var win;
var loss;
var words = [];
var wordle = [];
var iWord = document.getElementById("i-word");
var endE = document.getElementById("end");
var kBack = document.getElementById("k-backspace");
var main = document.getElementById("main");

var guesses = {};
for (let c = 1; c <= lives; c++) {
  guesses[c] = {};
  for (let l = 0; l < letters; l++) {
    guesses[c][l] = { letter: "", kin: 0 };
  }
}

var interface = {};
for (let p = 1; p <= letters * lives; p++) {
  interface[p] = 0;
}

var keyState = {};
for (let l = 0; l < validKeys.length - 1; l++) {
  keyState[validKeys[l]] = 0;
}

fetch("./asset/word.json")
  .then((response) => response.json())
  .then((data) => {
    words = data["dic"];
    wordle = data["wordle"];
    word = rnd(wordle);
    chance = 1;
    win = false;
    loss = false;

    main.classList.add("op");

    document.addEventListener(
      "keyup",
      (e) => {
        var keyName = e.key.toLocaleLowerCase();
        if (validKeys.includes(keyName)) {
          update(keyName);
        }
      },
      false
    );
  });

const rnd = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function update(k) {
  if (win || loss) {
    return;
  }
  if (k == "backspace") {
    guess = guess.substring(0, guess.length - 1);
    if (guessLetter != 0) {
      let CT = document.getElementById("tl-" + ((chance - 1) * letters + guessLetter));
      guessLetter--;
      CT.innerHTML = "";
    }
    return;
  }
  if (k == "enter") {
    if (guess.length == letters) {
      let tempGuess = guess;
      update("a");
      if (word.includes(guess)) {
        update("backspace");
        winCheck(tempGuess);
      }
    } else {
      iWord.classList.add("n-active");

      let iWordP = setInterval(function () {
        iWord.classList.remove("n-active");

        clearInterval(iWordP);
      }, 1800);
    }
    return;
  }
  if (guess.length == 5) {
    if (!words.includes(guess)) {
      iWord.classList.add("n-active");
      let bsw = 0;
      let lp = 6; // keep it even.
      let iWordP = setInterval(function () {
        lp--;
        bsw++;
        kBack.classList.add("kb-dander");
        if (bsw == 2) {
          kBack.classList.remove("kb-dander");
          bsw = 0;
        }
        if (lp == 0) {
          iWord.classList.remove("n-active");
          clearInterval(iWordP);
        }
      }, 300);
      return;
    }
    interfaceStateUpdate();
    keyStateUpdate();
    interfaceUpdate(interface);
    keyUpdate(keyState);
    winCheck(guess);

    chance++;
    lossCheck(chance);
    guess = "";
    guessLetter = 0;
    return;
    // interface update
  }
  guess = guessWork(k, guess, word);
}

function guessWork(l, gs, w) {
  gs += l;
  guessLetter++;
  let aGs = gs.split("");
  let CT = document.getElementById("tl-" + ((chance - 1) * letters + guessLetter));
  guesses[chance][aGs.indexOf(l, -1)]["letter"] = aGs[aGs.indexOf(l, -1)];
  CT.innerHTML = l;

  kinWork(aGs, w, l);

  return gs;
}

function kinWork(g, w, l) {
  if (w.includes(l)) {
    if (w[guessLetter - 1] == l) {
      guesses[chance][g.indexOf(l, -1)]["kin"] = 3;
    } else {
      guesses[chance][g.indexOf(l, -1)]["kin"] = 2;
    }
  } else {
    guesses[chance][g.indexOf(l, -1)]["kin"] = 1;
  }
}

function interfaceStateUpdate() {
  let it = 1;
  for (var ch in guesses) {
    for (var chLe in guesses[ch]) {
      interface[it] = guesses[ch][chLe]["kin"];
      it++;
    }
  }
}

function interfaceUpdate(i) {
  let tile;
  for (const t in i) {
    if (Object.hasOwnProperty.call(i, t)) {
      const s = i[t];
      tile = document.getElementById("t-" + t);
      tile.classList.remove("correct");
      tile.classList.remove("neg");
      switch (s) {
        case 3:
          tile.classList.add("correct");
          break;

        case 2:
          tile.classList.add("neg");
          break;
      }
    }
  }
}

function keyStateUpdate() {
  for (const le in guesses[chance]) {
    if (Object.hasOwnProperty.call(guesses[chance], le)) {
      keyState[guesses[chance][le]["letter"]] = guesses[chance][le]["kin"];
    }
  }
}

function keyUpdate(ksl) {
  let aKey;

  for (const k in ksl) {
    if (Object.hasOwnProperty.call(ksl, k)) {
      const ks = ksl[k];
      aKey = document.getElementById("k-" + k);
      aKey.classList.remove("correct");
      aKey.classList.remove("neg");
      aKey.classList.remove("k-used");

      switch (ks) {
        case 3:
          aKey.classList.add("correct");
          break;

        case 2:
          aKey.classList.add("neg");
          break;
        case 1:
          aKey.classList.add("k-used");
          break;
      }
    }
  }
}

function winCheck(g) {
  if (g == word) {
    endE.classList.add("win");
    if (!win) {
      end();
    }
    win = true;
  }
}

function lossCheck(c) {
  if (!win && c > 6) {
    endE.classList.add("loss");
    if (!loss) {
      end();
    }
    loss = true;
  }
}

function end() {
  let eTile;
  let eTileL;
  for (let li = 0; li < word.length; li++) {
    const l = word[li];
    eTile = document.getElementById("et-" + (li + 1));
    eTileL = document.getElementById("etl-" + (li + 1));
    eTileL.innerHTML = l;
    switch (keyState[l]) {
      case 3:
        eTile.classList.add("correct");
        break;

      case 2:
        eTile.classList.add("neg");
        break;
    }
  }
}
