
// to access all the boxes hacing the class box ;
let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// whenever box is clicked ; 
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.classList.add("o-color"); // Add 'o-color' class to change color for 'O'

      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.classList.add("x-color"); // Add 'o-color' class to change color for 'O'

      turnO = true;
    }

    // once box is clicked no make button disable ;
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;

  // initially msg containner is hide so we need to remove hide 
  // here we are removing class hide from msg containner 
  msgContainer.classList.remove("hide");

  disableBoxes(); // once winner is declareed make all buttons disable 
};

const checkWinner = () => {

    // pattern means eg. [1, 2, 3] from 2D array 
  for (let pattern of winPatterns) {

    let pos1Val = boxes[pattern[0]].innerText;   // box at pattern[0] index
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // if box is not empty 
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

        // if box value is same 
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);   // post1val is winner (X/O)
        return true;
      }
    }
  }
};

// when you click button the given class code will be executed 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
