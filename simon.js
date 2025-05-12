let gameSeq =[];
let userSeq =[];
let btns=["red","yellow","green","purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
//1st task -> ke koi si bhi keypress ho game start hojaiye
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
});

//3rd task -> button flash kerna + user jab touch kare tab flash kerna
function gameFlash(btn){
    btn.classList.add("flash"); //phele button mai flash class ko add kerdo aur jaise hi add hogi waise hi css bhi call hojaiyengi 
    setTimeout(function(){
        btn.classList.remove("flash"); //idhar handler function hai jo classlist flash ko wapis ye remove kerdega
    },250); //1sec ke baad
}

function userFlash(btn){
    btn.classList.add("userFlash"); //phele button mai flash class ko add kerdo aur jaise hi add hogi waise hi css bhi call hojaiyengi 
    setTimeout(function(){
        btn.classList.remove("userFlash"); //idhar handler function hai jo classlist flash ko wapis ye remove kerdega
    },250); //1sec ke baad
}

//2nd task -> ke level up hojaiye + game flash hojaiye
function levelUp(){
    //6th ye hai ke jaise hi level up hoga waise hi user seq ko reset hona hoga,
    //jaise agar level 1 hai toh userSeq 1 btn dabaye if 10 toh 10 ko
    userSeq=[];
    level++; 
    h2.innerText = `Level ${level}`; //h2 text mai level update kerdenge


    //idhar apn ko randomly game mai color generate kerwana hai
    let randidx = Math.floor(Math.random() * 3);//random color use kerenge 
    let randcolor= btns[randidx]; 
    let randbtn = document.querySelector(`.${randcolor}`);

    //5th task -> jo bhi randomly color generate krwaye hai usse game sequence mai put on kerdo
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randbtn);
}
//function for reset
function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level = 0;
}
//5th and main logic building task 
function checkAns(idx){
    // let idx = level - 1; // ye level wise check ker raha hai lekin apn ko toh sirf last idx se mtlb hai
    if( userSeq[idx]  === gameSeq[idx]){
        if(userSeq.length  === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game over! Your Score was <b>${level}</b> <br>Press Key to Start Again`
        //red color display kerne if galat hojaiye toh
        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },125)
        reset();
    }
}


//4th task-> add event listener jo button flash hua ussi ko wapis se kerna hai
function btnPress(){ 
    console.log(this);
    let btn = this; //detect karo ke konsa button ko press kerwaya hai
    userFlash(btn);
    //console.log("btn was pressed");

    //user ne konsa btn press kiya 
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor); //color ka array bana lo 

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

