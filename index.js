const btn = document.querySelectorAll(".box");
const msg = document.getElementById("msg");
const resetGame = document.getElementById("reset");

let winPattern = [  // All win patterns
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
]

function disableBtn(value){  // when will we click on the box then the box will be disabled
   value.disabled = true;
}

let playerX = true;

btn.forEach((item)=>{
    item.addEventListener("click",()=>{
        if(playerX){
            item.innerHTML = "X";
            item.classList.add("playerX");
            playerX = false;
        }
        else{
            item.innerHTML = "O";
            item.classList.add("playerO");
            playerX = true;
        }
        disableBtn(item);  // Called the disablebtn function
        checkItem(item);
    })
})

function showWinner(win){
    msg.innerHTML = `Winner is:  ${win}`;
    for(let i=0; i<btn.length; i++){  // After wining all boxs display will be disabled
        disableBtn(btn[i]);
    }
}

function checkItem(){
   for(pattern of winPattern){
     
    let fristval = btn[pattern[0]].innerText;
    let secoundval = btn[pattern[1]].innerText;
    let thirdval = btn[pattern[2]].innerText;
    
    if(fristval != "" && secoundval != "" && thirdval != ""){
        if(fristval == secoundval && secoundval == thirdval){
            showWinner(fristval);
        }
    }
   }
}


resetGame.addEventListener("click",()=>{
    for(let button of btn){
        msg.innerHTML = "";
        button.innerHTML = "";
        button.disabled = false;
        button.classList.remove("playerO");
        button.classList.remove("playerX");
    }
})