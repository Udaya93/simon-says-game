let gameseq=[];
let userseq=[];
let colors=["yellow","red","purple","green"];
let highest=0;
let h2=document.querySelector("h2");
let start=false;
let level=0;
// game starting whenever we press any key on document applying keypress event on document
//step => 1 game start
document.addEventListener("keypress",function(){
    if(start==false){
    console.log("game started");
    start=true;
    levelup(); 
    }
});

function gamebtnflash(btn){
    btn.classList.add("flash");
    setTimeout(function () {  // Corrected to setTimeout
        btn.classList.remove("flash");
    }, 250);
}
function userbtnflash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {  // Corrected to setTimeout
        btn.classList.remove("userflash");
    }, 250);
}


function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;
    //rendom color genarting by using random index 
    let randomidx=Math.floor(Math.random()*colors.length);
    let rc=colors[randomidx];
    let rb=document.querySelector(`.${rc}`);
    gameseq.push(rc);
    console.log(gameseq);
    gamebtnflash(rb);
}
function checkans(idx){
    console.log("level is: ",level);
    
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length===gameseq.length){
            highest=Math.max(highest,level);
            console.log("Highest Score: ", highest);
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over!   <b>Your Score was ${level}</b> <br>Press any key to start.`;
        //console.log("highest score=",highest);
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },300);
        notifyHighestScore(); // Notify user if they achieve a new highest score
        reset();
    }
}
//adding event listeners
function btnpress(){
    let btn=this;
    userbtnflash(btn);

    let userColor=btn.getAttribute("id");
    console.log(userColor);
    userseq.push(userColor);
    checkans(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btns of allbtns){
    btns.addEventListener("click",btnpress);
}
function reset(){
    gameseq=[];
    userseq=[];
    start=false;
    level=0;
}

// Function to notify the user when they achieve a new highest score
function notifyHighestScore() {
    if (level > highest) {
        h2.innerHTML += `<br>New Highest Score: ${highest}`;
        highest = level; // Update the highest score
    }
}
