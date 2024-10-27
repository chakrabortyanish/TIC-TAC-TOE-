const btn = document.querySelectorAll(".box");
const msg = document.getElementById("msg");
const resetGame = document.getElementById("reset");
const sound = new Audio("image/bubblepop-254773.mp3");    // button click sound
const winningSong = new Audio("image/winning-song.wav");   // winning song
const game_over = new Audio("image/game-over.mp3");    //  game over sound 

let winPattern = [  // All win patterns
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function disableBtn(value){  // when will we click on the box then the box will be disabled
   value.disabled = true;
}

let playerX = true;

function playerTurn(){  //player turn function
    if(playerX){
        msg.innerHTML = `Player X turn`;
    }
    else{
        msg.innerHTML = "Player O turn";
    }
}
playerTurn();

btn.forEach((item)=>{
    item.addEventListener("click",()=>{
        sound.play();
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
        playerTurn();
        disableBtn(item);   // Called the disablebtn function
        checkItem(item);
    });
});

function showWinner(win){
    winningSong.play();
    msg.innerHTML = `${win}  Won`;
    for(let i=0; i<btn.length; i++){  // After wining all boxs display will be disabled
        disableBtn(btn[i]);
    }
}

function matchtie(){
    if(btn[0].innerText !== "" && btn[1].innerText !== "" && btn[2].innerText !== "" && 
        btn[3].innerText !== "" && btn[4].innerText !== "" && btn[5].innerText !== "" && 
        btn[6].innerText !== "" && btn[7].innerText !== "" && btn[8].innerText !== ""){
        game_over.play();
        msg.innerHTML = `Result is:  Draw`;
    }
}

function checkItem(){   
   for(pattern of winPattern){
        
        if(btn[pattern[0]].innerText !== "" && btn[pattern[1]].innerText !== "" && btn[pattern[2]].innerText !== ""){
            
            if(btn[pattern[0]].innerText === btn[pattern[1]].innerText && btn[pattern[1]].innerText === btn[pattern[2]].innerText){
                showWinner(btn[pattern[0]].innerText);
                btn[pattern[0]].classList.add("won-color");
                btn[pattern[1]].classList.add("won-color");
                btn[pattern[2]].classList.add("won-color");
                displayWinningLine(btn[pattern[0]].id, btn[pattern[1]].id, btn[pattern[2]].id);
            }
            else if(btn[pattern[0]].innerText !== btn[pattern[1]].innerText && btn[pattern[1]].innerText !== btn[pattern[2]].innerText){
                matchtie();
            }
        }

   }
}

function displayWinningLine(val1, val2, val3){   // winning line show function
    if(btn[0].id === val1 && btn[1].id === val2 && btn[2].id === val3){
       document.getElementById("r1").style.display = "block";
    }
    else if(btn[3].id === val1 && btn[4].id === val2 && btn[5].id === val3){
        document.getElementById("r2").style.display = "block";
    }
    else if(btn[6].id === val1 && btn[7].id === val2 && btn[8].id === val3){
        document.getElementById("r3").style.display = "block";
    }
    else if(btn[0].id === val1 && btn[3].id === val2 && btn[6].id === val3){
        document.getElementById("c1").style.display = "block";
    }
    else if(btn[1].id === val1 && btn[4].id === val2 && btn[7].id === val3){
         document.getElementById("c2").style.display = "block";
    }
    else if(btn[2].id === val1 && btn[5].id === val2 && btn[8].id === val3){
         document.getElementById("c3").style.display = "block";
    }
    else if(btn[0].id === val1 && btn[4].id === val2 && btn[8].id === val3){
        document.getElementById("x_left").style.display = "block";
    }
    else if(btn[2].id === val1 && btn[4].id === val2 && btn[6].id === val3){
         document.getElementById("x_right").style.display = "block";
    }
}

resetGame.addEventListener("click",()=>{  // reset game
    for(let button of btn){
        playerTurn();
        button.innerHTML = "";
        button.disabled = false;
        button.classList.remove("playerO");
        button.classList.remove("playerX");
        button.classList.remove("won-color");
    }

    document.querySelectorAll(".win_line").forEach((line) =>{
        line.style.display = "none";   // winning line hidden
    });
});