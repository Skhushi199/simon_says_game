let gameSeq = [];
let userSeq = [];
let level = 0;
let highestScore = level*10;

let btns = ["yellow", "red", "purple", "green"];

let started = false;


let h2 = document.querySelector("h3");

document.addEventListener("keypress",()=>{
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

const btnFlash = (btn)=>{
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}

const userbtnFlash = (btn)=>{
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },200);
}

const levelUp = ()=>{
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let ranIndex = Math.floor(Math.random()*4);
    let ranColor = btns[ranIndex];
    let ranBtn = document.querySelector(`.${ranColor}`);
    // console.log(ranIndex);
    // console.log(ranColor);
    // console.log(ranBtn);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    btnFlash(ranBtn);
}

function checkAns(idx){
    

    if(userSeq[idx] == gameSeq[idx]){
        console.log("matched");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(highestScore <= (level*10 - 10)){
            highestScore = level*10 - 10;
        }
        h2.innerHTML = `GAME OVER! your score was <b>${level*10 - 10}</b> <br>Highest Score is:${highestScore}<br> Press any Key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        
        reset();
       
    }
}

function btnPressed(){
    if(started == true){
        // console.log(this); 
    let btn = this;
    userbtnFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}

const reset = ()=>{
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}