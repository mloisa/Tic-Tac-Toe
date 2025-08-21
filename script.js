const cells = document.querySelectorAll("td");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");
const clickSound = document.getElementById("click");
const winSound = document.getElementById("sparkle");
const loseSound = document.getElementById("lose");
let currentMove = 1;

restartButton.addEventListener("click", () => {
    window.location.reload();
});
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    clickSound.play();
    if (cell.textContent === "") {
      cell.textContent = currentMove % 2 === 0 ? "O" : "X";
      cell.style.color = currentMove % 2 === 0 ? "#4bc958" : "#884bc9";
      status.textContent = `Jogador ${currentMove % 2 === 0 ? "O" : "X"} jogou`;
      if (currentMove % 2 === 0) {
        player1.style.opacity = "1";
        player2.style.opacity = "0.6";
      } else {
        player2.style.opacity = "1";
        player1.style.opacity = "0.6";
      }
      const winner = checkWinner();
      if (winner) {
        winSound.play();
        swal(`Jogador ${winner} venceu!`);
        cells.forEach((cell) => (cell.textContent = ""));
        status.textContent = "Aguardando jogador X";
          player1.style.opacity = "1";
        player2.style.opacity = "0.6";
        currentMove = 1;
        return;
      } else if (currentMove === 9) {
        loseSound.play();
        swal("Empate!");
        cells.forEach((cell) => (cell.textContent = ""));
        status.textContent = "Aguardando jogador X";
          player1.style.opacity = "1";
        player2.style.opacity = "0.6";
        currentMove = 1;
        return;
      }
      currentMove++;
    }
  });
});
function checkWinner() {
  const board = [
    [cells[0].textContent, cells[1].textContent, cells[2].textContent],
    [cells[3].textContent, cells[4].textContent, cells[5].textContent],
    [cells[6].textContent, cells[7].textContent, cells[8].textContent],
  ];
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    )
      return board[i][0];
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      return board[0][i];
  }
  // Diagonais
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return board[0][2];
  return null;
}

