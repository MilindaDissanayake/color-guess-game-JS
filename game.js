let circles = document.getElementsByClassName("square");
let colorname = document.querySelector(".color-name");
let indicator = document.querySelector('.indicator' );
let score = document.getElementById("ScoreValue");
//buttons
let button = document.getElementById("replay");
let scorebutton = document.getElementById("file");

//audios
let correct = new Audio('music/correct.mp3');
let incorrect = new Audio('music/incorrect.mp3');
let ScoreValue = 0;
let colors = [];

function init(){
    resetcolor();
    guessingcolor();
    reset();
}

function setBackgroundImage() {
    let backdrop = document.getElementById("body");
    backdrop.style.backgroundImage = "url('images/image.png')";
  }
  setBackgroundImage();
  

function resetcolor(){
    Array.from(circles).forEach((element, index) => {
        colors.push(randomColor());
        element.style.backgroundColor = colors[index];
      });
}

function guessingcolor(){
    return colors[randomnum()];
}

function randomnum(){
    return Math.floor(Math.random()*colors.length)
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function reset() {
    let guessedColor = guessingcolor();
    console.log(guessedColor);
    colorname.textContent = guessedColor;
  
    Array.from(circles).forEach((element) => {
      element.addEventListener('click', () => {
        if (element.style.backgroundColor === guessedColor) {
          console.log('correct');
          indicator.textContent = "Correct guess";
          ScoreValue++;
          correct.play();
          score.innerHTML = "&nbsp" + ScoreValue;
        } else {
          console.log('incorrect');
          indicator.textContent = "Incorrect guess";
          incorrect.play();
        }
      });
    });
}
init();
button.addEventListener('click',()=>{
    colors=[];
    resetcolor();
    randomnum();
    guessingcolor();
    reset();
    indicator.textContent = "GUESS THE COLOR";
})
console.log(colors);

function saveScoreAsTextFile() {
    const scoreText = `Score: ${ScoreValue}`;
    const blob = new Blob([scoreText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'score.txt';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  scorebutton.addEventListener('click',()=>{
      saveScoreAsTextFile();
})
 
  