
const boxes = ['red', 'blue', 'yellow', 'green'];

let level = 0;
let gameStarted = false;

let botChoices = [];
let userChoices = [];

const botChoice = () => {
    let random = Math.floor(Math.random() * 4);
    $(`.${boxes[random]}`).fadeOut(100).fadeIn(100);
    new Audio(`sounds/${boxes[random]}.mp3`).play();
    $('h1').text(`Level ${++level}`);
    botChoices.push(boxes[random]);
    userChoices = [];
};

const checkStatus = () => {
    $(document).keydown(() => {
        if (gameStarted === false) {
            botChoice();
            $(document).off('keydown');
            gameStarted = true;
        }
    });
};

const gameOver = () => {
    $('html').addClass('game-over');
    new Audio('sounds/wrong.mp3').play();
    $('h1').text('Game Over, Press Any Key to Restart');
    setTimeout(() => {
        $('html').removeClass('game-over');
    }, 200);
    level = 0;
    gameStarted = false;
    botChoices = [];
    userChoices = [];
    checkStatus();
};

const simonLogic = () => {
//Don't really Get how this part works
    if (userChoices[userChoices.length - 1] === botChoices[userChoices.length - 1]) {
        if (userChoices.length === botChoices.length){
          setTimeout(()=> {
            botChoice();
          }, 1000);
        }
      } else {
        gameOver();
      } 
};

    $('.btn').click((e) => {
        $(e.target).addClass('pressed');
        new Audio(`sounds/${e.target.id}.mp3`).play();
        setTimeout(() => {
            $(e.target).removeClass('pressed')
        }, 100);
            userChoices.push(e.target.id);
            simonLogic();  
    });
    
checkStatus();