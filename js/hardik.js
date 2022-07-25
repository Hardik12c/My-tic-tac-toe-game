console.log("welcome to tictactoe");

// declaring audios
let musicaudio=new Audio("../othertools/music.mp3");
let audioturn=new Audio("../othertools/ting.mp3");
let overaudio=new Audio("../othertools/gameover.mp3");

// html variables
let boxes=Array.from(document.getElementsByClassName("box"));
let chance=document.getElementsByClassName("chance");
let boxtexts=document.getElementsByClassName("boxtext");
let gif=document.querySelector(".gameinfo img");
let reset=document.getElementById("reset");
// logic variables
let turn='X';
let gameover=0;

// play musicaudio
musicaudio.volume=0.5;
musicaudio.play();   

// function to changeturn
let changeturn=()=>{
    if(turn=='X'){
        turn='0';
    }else{
        turn='X';
    }
}

// function for win
let checkwin=()=>{
    let win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    win.forEach((element)=>{
        if((boxtexts[element[0]].innerText==boxtexts[element[1]].innerText) && (boxtexts[element[1]].innerText==boxtexts[element[2]].innerText) &&(boxtexts[element[1]].innerText!='')){
            chance[0].innerText=`${boxtexts[element[0]].innerText} won`;
            gameover=1;
            gif.style.opacity=1;
            musicaudio.pause();
            overaudio.play();
        }
    })
}

// make all boxes blank
let makeallblank=()=>{
    Array.from(boxtexts).forEach(element=>{
        element.innerText='';
    })
}

// function for game
boxes.forEach(element=>{
    element.addEventListener('click',()=>{
        let boxtext=element.querySelector(".boxtext");
        if(boxtext.innerText=='' && gameover==0){
            boxtext.innerText=turn;
            audioturn.play();
            changeturn();
            checkwin();
            if(gameover==0){
                chance[0].innerText=`Chance for ${turn}`;
            }
        }
        else if(gameover==1){
            chance[0].innerText=`Please reset to play`;
        }
    })
})

// reset button setting
reset.addEventListener('click',()=>{
    makeallblank();
    musicaudio.currentTime=0;
    musicaudio.play();
    turn="X"
    chance[0].innerText=`Chance for ${turn}`;
    gameover=0;
    gif.style.opacity=0;
})