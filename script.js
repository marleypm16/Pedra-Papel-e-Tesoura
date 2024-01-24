const btnBall = document.querySelector(".ball");
const btnX = document.querySelector(".xis");
const cell = document.querySelectorAll(".cell");
const winningMessageDisplay = document.querySelector(".winning-message");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".winning-message-text");
const btnRestart = document.querySelector("#restartButton");

class Game {
  constructor() {
    this.isBall = null;
    this.isX = null;
    this.player = null;
  }

  restart() {
    winningMessageDisplay.style.display = "none";
    this.isBall = null;
    this.isX = null;
    this.player = null;

    cell.forEach((cell) => {
      cell.classList.remove("circle");
      cell.classList.remove("x");
    });

    board.style.display = "none";
    btnBall.style.display = "inline";
    btnX.style.display = "inline";
    winningMessage.innerHTML = ""; // Add this line
  }

  chooseBallOrX(choice) {
    this.player = choice;
    return this.player;
  }

  switchPlayer() {
    this.isBall = !this.isBall;
    this.isX = !this.isX;
  }

  insertBallOrX(cell) {
    console.log(this.isBall);
    console.log(this.isX);
    if (this.isBall) {
      cell.classList.add("circle");
    } else if (this.isX) {
      cell.classList.add("x");
    }
    this.winner();
    this.switchPlayer();
  }

  winner() {
    const winPossibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];

    let draw = true;

    for (const possibilities of winPossibilities) {
      const [a, b, c] = possibilities;

      if (
        cell[a].classList.contains("circle") &&
        cell[b].classList.contains("circle") &&
        cell[c].classList.contains("circle")
      ) {
        winningMessageDisplay.style.display = "block";
        winningMessage.innerHTML = "Bola ganhou";
        return; // exit the loop if there's a winner
      } else if (
        cell[a].classList.contains("x") &&
        cell[b].classList.contains("x") &&
        cell[c].classList.contains("x")
      ) {
        winningMessageDisplay.style.display = "block";
        winningMessage.innerHTML = "X ganhou";
        return; // exit the loop if there's a winner
      } else if (
        (!cell[a].classList.contains("circle") &&
          !cell[a].classList.contains("x")) ||
        (!cell[b].classList.contains("circle") &&
          !cell[b].classList.contains("x")) ||
        (!cell[c].classList.contains("circle") &&
          !cell[c].classList.contains("x"))
      ) {
        // If any cell is empty, the game is not a draw
        draw = false;
      }
    }

    if (draw) {
      winningMessageDisplay.style.display = "block";
      winningMessage.innerHTML = "Empate";
    }
  }

  startGame() {
    // Reset the player state based on the user's choice
    console.log(this.player);
    console.log(this.isBall);
    console.log(this.isX);
    if (this.player == "ball") {
      this.isBall = true;
      this.isX = false;
    } else {
      this.isBall = false;
      this.isX = true;
    }

    cell.forEach((cell) => {
      cell.removeEventListener("click", this.handleCellClick);
    });

    // Add new click event listeners
    cell.forEach((cell) => {
      cell.addEventListener("click", this.handleCellClick);
    });
  }
  handleCellClick = (event) => {
    this.insertBallOrX(event.target);
  };
}

const game = new Game();

btnBall.addEventListener("click", () => {
  board.style.display = "grid";
  btnBall.style.display = "none";
  btnX.style.display = "none";
  game.chooseBallOrX("ball");
  game.startGame();
});

btnX.addEventListener("click", () => {
  game.chooseBallOrX("x");
  board.style.display = "grid";
  btnBall.style.display = "none";

  btnX.style.display = "none";
  game.startGame();
});

btnRestart.addEventListener("click", () => {
  game.restart();
});
