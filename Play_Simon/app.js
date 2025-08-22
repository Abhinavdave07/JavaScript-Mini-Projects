let gameseq = [];
let userseq = [];

let start = false;
let level = 0;
let btns = ["red","green","blue","yellow"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function()
{
    if(start == false)
    {
        console.log("Game Started");
        start=true;
    }
    levelup();
});



function levelup()
{
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);

    btnFlash(randBtn);
   

}

function btnPressed()
{
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userseq.push(userColor);

    check(userseq.length-1);

}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns)
{
    btn.addEventListener("click",btnPressed);
}

function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function check(idx)
{
// let idx = level-1;
if(userseq[idx]==gameseq[idx])
{
    if(userseq.length==gameseq.length){
        setTimeout(levelup,1000);
    }

}
else{
    h2.innerText = "Game Over!!!!!!!!!!!!!!";
    gamereset();
}
}

function gamereset() {
    level = 0;
    gameseq = [];
    start = false;
    h2.innerText = "Game Over!!! Press any key to Restart";
}


