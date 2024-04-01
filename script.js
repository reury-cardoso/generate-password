let numbers = false;
let letters = true;
let characters = false;

let upperCase = false;
let lowerCase = false;

let passwordS = [];

let placePass = document.getElementById("generated-password");

function checkFormat() {
  let tagNumbers = document.getElementById("numbers").classList.value;
  let tagCharacters = document.getElementById("characters").classList.value;
  let tagUpper = document.getElementById("upperCase").classList.value;
  let tagLower = document.getElementById("lowerCase").classList.value;

  numbers = tagNumbers == "checked" ? true : false;
  characters = tagCharacters == "checked" ? true : false;
  upperCase = tagUpper == "checked" ? true : false;
  lowerCase = tagLower == "checked" ? true : false;

  if (upperCase == false && lowerCase == false) {
    letters = false;
  } else {
    letters = true;
  }

  checkErrorFeature(true);
}
document.getElementById("numbers").addEventListener("click", function () {
  let tagNumbers = document.getElementById("numbers").classList.value;
  if (tagNumbers == "checked") {
    document.getElementById("numbers").classList.value = "no-checked";
  } else {
    document.getElementById("numbers").classList.value = "checked";
  }
  checkFormat();
});
document.getElementById("characters").addEventListener("click", function () {
  let tagCharacters = document.getElementById("characters").classList.value;
  if (tagCharacters == "checked") {
    document.getElementById("characters").classList.value = "no-checked";
  } else {
    document.getElementById("characters").classList.value = "checked";
  }
  checkFormat();
});
document.getElementById("upperCase").addEventListener("click", function () {
  let tagUpper = document.getElementById("upperCase").classList.value;
  if (tagUpper == "checked") {
    document.getElementById("upperCase").classList.value = "no-checked";
  } else {
    document.getElementById("upperCase").classList.value = "checked";
  }
  checkFormat();
});
document.getElementById("lowerCase").addEventListener("click", function () {
  let tagLower = document.getElementById("lowerCase").classList.value;
  if (tagLower == "checked") {
    document.getElementById("lowerCase").classList.value = "no-checked";
  } else {
    document.getElementById("lowerCase").classList.value = "checked";
  }
  checkFormat();
});

document.getElementById("copy").addEventListener("click", async function () {
  navigator.clipboard.writeText(placePass.value);
  alert("Senha copiada");
});

function getNumber() {
  return Math.floor(Math.random() * (9 - 0 + 1));
}

function getLetter() {
  let randomLetter = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
  return String.fromCharCode(randomLetter);
}

function getCharacter() {
  const randomCharacter = Math.floor(Math.random() * (47 - 33 + 1)) + 33;
  return String.fromCharCode(randomCharacter);
}

function checkSpecification() {
  let model =
    numbers && letters && characters
      ? [getNumber, getLetter, getCharacter]
      : numbers && letters
      ? [getNumber, getLetter]
      : letters && characters
      ? [getLetter, getCharacter]
      : numbers && characters
      ? [getCharacter, getNumber]
      : numbers
      ? [getNumber]
      : characters
      ? [getCharacter]
      : letters
      ? [getLetter]
      : null;
  return model;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addHistory() {
  for (let index = 1; index <= 4; index++) {
    const valueH = document.getElementById("h-value" + index);
    passwordSelect = passwordS[index] == undefined ? ' ' : passwordS[index]
    valueH.value = passwordSelect
  }
}

async function generatPassword(size) {
  let password = "";
  let arrayFunction = checkSpecification();

  while (password.length < size) {
    if (upperCase && lowerCase) {
      let getItem =
        arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem();
      let cases = [String.prototype.toLowerCase, String.prototype.toUpperCase];
      var randomCase = Math.floor(Math.random() * cases.length);
      password += cases[randomCase].call(item);
    } else if (lowerCase) {
      let getItem =
        arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem();
      password += item.toString().toLowerCase();
    } else {
      let getItem =
        arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem();
      password += item.toString();
    }
  }

  placePass.value = "";
  passwordS.unshift(password);
  addHistory()
  for (var index = 0; index < password.length; index++) {
    placePass.value += password[index];
    await sleep(20);
    if (placePass.value.length >= size) {
      break;
    }
  }
}

function checkErrorFeature(show) {
  if (lowerCase || upperCase || characters || numbers || letters || show) {
    document.getElementById("errorSelection").style.display = "none";
  } else {
    placePass.value = "";
    document.getElementById("errorSelection").style.display = "flex";
  }
}

document.getElementById("get-password").addEventListener("click", function () {
  checkErrorFeature(false);

  let size =
    document.getElementById("size").value == ""
      ? 8
      : document.getElementById("size").value;
  generatPassword(Number(size));
});
