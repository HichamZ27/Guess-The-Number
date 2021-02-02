//Variables pour stocker nos données
let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

let guessSubmit = document.querySelector(".guessSubmit");
//prend une information - un sélecteur CSS qui sélectionne l'élément auquel vous voulez faire référence
let guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;
//placer automatiquement le curseur dans le champ texte <input> dès le chargement de la page
guessField.focus();

//Structures conditionnelles
function checkGuess() {
  //déclare une variable nommée userGuess et définit sa valeur par celle qui vient d'être saisie dans le champ de texte. Nous faisons passer aussi cette valeur par la méthode  Number() , juste pour nous assurer que la valeur stockée dans userGuess est bien un nombre
  let userGuess = Number(guessField.value);
  //le test vérifie si la variable guessCount est égale à 1
  if (guessCount === 1) {
    guesses.textContent = "Propositions précédentes : ";
  }
  guesses.textContent += userGuess + " ";
  //vérifie si la supposition de l'utilisateur est égale au nombre aléatoire randomNumber situé en haut de notre code JavaScript. Si c'est le cas, le joueur a deviné correctement et a gagné le jeu, nous affichons donc un message de félicitations d'une belle couleur verte au joueur, effaçons le contenu de la boîte d'information sur la position de l'estimation et exécutons une fonction appelée setGameOver()
  if (userGuess === randomNumber) {
    lastResult.textContent = "Bravo, vous avez trouvé le nombre !";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
    //vérifie si l'utilisateur a épuisé toutes ses tentatives. Si c'est le cas, le programme fait la même chose que dans le bloc précédent, mais avec un message de fin de partie au lieu d'un message de félicitations
  } else if (guessCount === 10) {
    lastResult.textContent = "!!! PERDU !!!";
    setGameOver();
    //exécuté que si aucun des deux autres tests n'a renvoyé vrai
    //Dans ce cas, nous lui disons que sa supposition est mauvaise, puis nous effectuons un autre test conditionnel pour vérifier si elle est supérieure ou inférieure à la valeur exacte et affichons un autre message approprié pour indiquer si sa supposition est trop forte ou trop faible
  } else {
    lastResult.textContent = "Faux !";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop petit !";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop grand !";
    }
  }
  //préparent à une nouvelle proposition. Nous ajoutons 1 à la variable guessCount qui décompte les tours (++ est une opération d'incrémentation — ajout de 1), puis effaçons le champ texte du formulaire et lui redonnons le focus, pour être prêt pour la saisie suivante
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

//Evénements
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  //Les deux premières lignes désactivent l'entrée de texte et le bouton en définissant leurs propriétés désactivées à true
  guessField.disabled = true;
  guessSubmit.disabled = true;
  //Les trois lignes suivantes génèrent un nouvel <button> élément, avec le libellé "Démarrer une nouvelle partie" et l'ajoute au bas du HTML existant
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  //La dernière ligne définit un écouteur d'événement sur ce nouveau bouton : un click sur le bouton déclenchera un appel de la fonction  resetGame()
  resetButton.addEventListener("click", resetGame);
}

//réinitialise complètement les paramètres du jeu (le joueur pourra commencer une nouvelle partie)
function resetGame() {
  //Remettre le compteur guessCount à 1
  guessCount = 1;
  //Effacer tous les paragraphes d'information
  let resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  //Supprimer le bouton de réinitialisation de notre code
  resetButton.parentNode.removeChild(resetButton);
  //Activer les éléments de formulaire, vide et met au point le champ de texte, prêt à entrer une nouvelle proposition
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  //Supprimer la couleur d'arrière-plan du paragraphe lastResult
  lastResult.style.backgroundColor = "white";
  //Génèrer un nouveau nombre aléatoire afin que vous ne deviniez plus le même nombre !
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
