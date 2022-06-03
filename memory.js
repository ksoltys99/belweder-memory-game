document.querySelector('.board').addEventListener('click', checkAndRevealImage);

const imageIndexes = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14];
let firstRevealed = false;
let firstVisibleImage = '';
let turnCounter = 0;
let firstClickedDiv;
let blockFor2Sec = false;
let correctGuesses = 0;
const numberOfCards = 30;
const numberOfPairs = numberOfCards / 2;

function shuffleImages(array){
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
}

function generateBoard(){
    const shuffledArray = shuffleImages(imageIndexes);
    for(let i=1;i<=numberOfCards;i++){
        const currentDiv = `#div${i}`;
        document.querySelector(currentDiv).style.backgroundImage =  `url(./images/image_${shuffledArray[i-1]}.JPG)`;
    }
}


function checkAndRevealImage(event){
    const target = event.target.outerHTML;

    if((blockFor2Sec) || (target.includes('revealed')) || (target.includes('row'))) return;

    event.target.classList.add('revealed');
    const revealed = event.target.style.backgroundImage;

    //first card
    if(firstRevealed === false){
        firstRevealed = true;
        firstVisibleImage = revealed;
        firstClickedDiv = event.target;
    }

    //second card
    else{
        blockFor2Sec = true;

        //correct guess
        if(revealed===firstVisibleImage){
            blockFor2Sec = false;
            correctGuesses++;
        }

        //incorrect guess
        else{
            setTimeout(function(){
            firstClickedDiv.classList.remove('revealed');
            event.target.classList.remove('revealed');
            blockFor2Sec = false;
            }, 1000);
        }

        if (correctGuesses === numberOfPairs) victory();

        firstRevealed = false;
        turnCounter++;
        document.querySelector('.turn-counter-box').innerHTML=`<h2>Turn counter: ${turnCounter}</h2>`;
    }
        
    
}

function victory(){
    
    const winSong = new Audio('win.mp3');
    winSong.play();
    winSong.volume=0.05;
    
    const rows = document.querySelectorAll('.row');
    rows.forEach(element => {
       element.style.opacity = 0; 
    });

    document.querySelector('.board').style.backgroundImage = 'url(./images/XDDD.gif)';
    document.querySelector('.board').style.width = '367px';
    document.querySelector('.board').style.height = '427px';
    document.querySelector('.board').style.marginLeft = '-185px';
    document.querySelector('.board').style.marginTop ='-215px';
    document.querySelector('.turn-counter-box').innerHTML=`<h2>Done after ${turnCounter} rounds!</h2>`;    
}

generateBoard();