"use strict";

let playerScore = 0;
let computerScore = 0;
const playerScore_span = document.getElementById("playerScore");
const computerScore_span = document.getElementById("machinesScore");
const scoreBoard_div = document.querySelector(".scoreBoard");
const finalOutcome_p = document.querySelector(".finalOutcome > p");
const rock_i = document.getElementById("rock");
const paper_i = document.getElementById("paper");
const scissors_i = document.getElementById("scissors");

function computerPlay() {
	const weaponsArray = ["rock", "paper", "scissors"];
	return weaponsArray[Math.floor(Math.random() * weaponsArray.length)];
}

function capitalize(string) {
	return (string.charAt(0).toUpperCase() + string.toLowerCase().slice(1));
}

function win(player, computer) {
	const player_div = document.getElementById(player);
	playerScore++;
	playerScore_span.innerHTML = playerScore;
	computerScore_span.innerHTML = computerScore;
	finalOutcome_p.innerHTML = `${capitalize(player)} beats ${capitalize(computer)}! You win! 🏆`;
	player_div.classList.add("goldenGlow");
	setTimeout(() => player_div.classList.remove("goldenGlow"), 300);
}

function lose(player, computer) {
	const player_div = document.getElementById(player);
	computerScore++;
	playerScore_span.innerHTML = playerScore;
	computerScore_span.innerHTML = computerScore;
	finalOutcome_p.innerHTML = `${capitalize(player)} beats ${capitalize(computer)}! You lose! 💀`;
	player_div.classList.add("redGlow");
	setTimeout(() => player_div.classList.remove("redGlow"), 300);
}

function tie(player, computer) {
	const player_div = document.getElementById(player);
	finalOutcome_p.innerHTML = `${capitalize(player)} equals ${capitalize(computer)}! It's a tie!`;
	player_div.classList.add("greyGlow");
	setTimeout(() => player_div.classList.remove("greyGlow"), 300);
}

function game(playerSelection) {
	const computerSelection = computerPlay();
	switch (playerSelection + computerSelection) {
		case "rockscissors":
		case "paperrock":
		case "scissorspaper":
			win(playerSelection, computerSelection);
			break;
		case "rockpaper":
		case "paperscissors":
		case "scissorsrock":
			lose(playerSelection, computerSelection);
			break;
		case "rockrock":
		case "paperpaper":
		case "scissorsscissors":
			tie(playerSelection, computerSelection);
			break;
	}
	if (playerScore >= 5 && computerScore < 5) {
		finalOutcome_p.textContent = "Game Over - You Win! Humanity is safe for now...";
	} else if (playerScore < 5 && computerScore >= 5) {
		finalOutcome_p.textContent = "Game Over - You failed! The world is lost...";
	}
	restartGame();
}

function restartGame() {
	if (playerScore >= 5 && computerScore < 5 || playerScore < 5 && computerScore >= 5) {
		setTimeout(() => window.location.reload(), 3000);
		return document.querySelector(".weapons").classList.add("noPointerEvents");
	}
}

function eventListeners() {
	rock_i.addEventListener("click", () => game("rock"));
	paper_i.addEventListener("click", () => game("paper"));
	scissors_i.addEventListener("click", () => game("scissors"));
}

eventListeners();
