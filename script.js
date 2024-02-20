
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
  let numbers = true;
  let letters = true;
  let characters = true;


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

function generatPassword(size) {
  let upperCase = false
  let lowerCase = true

  let password = "";
  let arrayFunction = checkSpecification();

  while (password.length < size) {
    if(upperCase && lowerCase){
      let getItem = arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem()
      let cases = [String.prototype.toLowerCase, String.prototype.toUpperCase]
      var randomCase = Math.floor(Math.random() * cases.length)
      password += cases[randomCase].call(item);
    }else if(lowerCase){
      let getItem = arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem()
      password += item.toString().toLowerCase();
    }else{
      let getItem = arrayFunction[Math.floor(Math.random() * arrayFunction.length)];
      let item = getItem()
      password += item.toString();
    }
  }
  console.log(password)
}


generatPassword(18)
