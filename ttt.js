let boxes = document.querySelectorAll(".box");
let msg=document.querySelector(".winMsg");
let msgcon = document.querySelector(".newGame");
let restart=document.querySelector("#btn");
let newBtn=document.querySelector("#newG");
let turn=new Audio("click.mp3");
let draw=new Audio("drow match.mp3");
let onwin=new Audio("win.mp3");
let turnX = true;

const winP = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [6,4,2]
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
    if (box.classList.contains("disabled") || box.innerText !== "") return;

     console.log("clicked");
        if(turnX){
            box.innerText="X";
            turnX=false;
            turn.play();
        }else{
            box.innerText="O";
            turnX=true;
             turn.play();
        }
        box.classList.add("disabled");
        checkWin();
        document.getElementsByClassName("msgP")[0].innerText="Turn For : "+ (turnX ? "X" : "O");
  });
});


const disableBoxes = () => {
  boxes.forEach(box => box.classList.add("disabled"));
};
const enableBoxes = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("disabled");
  });
  turnX = true;
};
const showWinner = (winner, pattern) => {
    disableBoxes();
    document.querySelector(".outerCont").style.backgroundColor = "green";
    document.querySelector("#btn").style.boxShadow = "0 0 3rem green";
    document.querySelector("#newG").style.boxShadow = "0 0 3rem green";
    onwin.play();
    const line = document.querySelector(".line");

    // ✅ FIX: Declare transforms FIRST
    const transforms = {
        "0,1,2": "translate(0px, -160px) rotate(0deg)",
        "3,4,5": "translate(0px, 0px) rotate(0deg)",
        "6,7,8": "translate(0px, 160px) rotate(0deg)",
        "0,3,6": "translate(82px, -245px) rotate(90deg)",
        "1,4,7": "translate(245px, -245px) rotate(90deg)",
        "2,5,8": "translate(410px, -245px) rotate(90deg)",
        "0,4,8": "translate(70px, -185px) rotate(45deg)",
        "6,4,2": "translate(70px, 185px) rotate(-45deg)"
    };

    line.style.display = "block";
    line.style.width = "0"; // initial
    line.style.transform = transforms[pattern.join(",")] || "";

    setTimeout(() => {
        line.style.width = "490px"; // expand with transition
    }, 5); 

    setTimeout(() => {
        msg.innerText = `Congratulation, winner is ${winner}`;
        msg.classList.remove("hide");
        msgcon.classList.remove("hide");
        document.querySelector(".newBtn").classList.remove("hide");
        document.querySelector(".mCont").classList.add("hide");
        document.querySelector(".msgP").classList.add("hide");
        document.querySelector(".btn").classList.add("hide");
        
    }, 2500);
};



const checkWin = () => {
  let isDraw = true;

  for (let pattern of winP) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
    console.log("winner", pos1);
    showWinner(pos1, pattern); 
    return; 
        }
    }
  }


  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false;
    }
  })

  if (isDraw) {
    msg.innerText = "Match Draw!";
    msgcon.classList.remove("hide");
    msg.classList.remove("hide");
    disableBoxes();
    draw.play();
    document.querySelector(".outerCont").style.backgroundColor = "red";
    document.querySelector("#btn").style.boxShadow = "0 0 3rem red";
  }
};
const resetGame = () => {
    turnX = true;
    enableBoxes();
    const line = document.querySelector(".line");
line.style.width = "0";
line.style.transform = "none";
line.style.display = "none";

    msgcon.classList.add("hide");
    msg.classList.add("hide");
    document.querySelector(".newBtn").classList.add("hide");
    document.querySelector(".mCont").classList.remove("hide");   
    document.querySelector(".msgP").classList.remove("hide");    
    document.querySelector(".btn").classList.remove("hide");     
    document.getElementsByClassName("msgP")[0].innerText = "Turn For : X";
    document.querySelector(".outerCont").style.backgroundColor = "rgb(224, 222, 222)";
    document.querySelector("#btn").style.boxShadow = "0 0 3rem rgba(80, 78, 78, 0.993)";
    document.querySelector("#newG").style.boxShadow = "0 0 3rem rgba(15, 15, 15, 0.747)";

};

newBtn.addEventListener("click",resetGame);
restart.addEventListener("click",resetGame);
resetGame();
