import blueRock from "/assets/moves/rock-blue.png"
import bluePaper from "/assets/moves/paper-blue.png";
import blueScissors from "/assets/moves/scissors-blue.png";

import redRock from "/assets/moves/rock-red.png";
import redPaper from "/assets/moves/paper-red.png";
import redScissors from "/assets/moves/scissors-red.png";


export type Team = 'blue' | 'red';
export type Move = 'rock' | 'paper' | 'scissors';
export type Result = 'win' | 'lose' | 'draw';

export const MOVES: Move[] = ["rock", "paper", "scissors"];

export const MOVE_INFO: Record<Team,Record<Move, { label: string; image: string }>> = {
   blue: {
        rock: { label: "Rock", image: blueRock },
        paper: { label: "Paper", image: bluePaper},
       scissors: {label: "Scissors", image: blueScissors}
   },
    red: {
        rock: { label: "Rock", image: redRock },
        paper: { label: "Paper", image: redPaper},
        scissors: {label: "Scissors", image: redScissors}
    }
};

const BEATS: Record<Move, Move> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};
export function getResult(player: Move, bot: Move): Result {
    if (player === bot) return "draw";
    return BEATS[player] === bot ? "win" : "lose";
}

export function randomMove(): Move {
    return MOVES[Math.floor(Math.random() * MOVES.length)];
}

export const TEAMS: Record<Team, {
    name: string;
    chip: string;
    border: string;
    text: string;
    dot: string;
    button: string;
}> = {
    blue: {
        name: "Blue Team",
        chip: "border-sky-400/60 bg-sky-500/10 text-sky-200",
        border: "border-sky-400",
        text: "text-sky-300",
        dot: "bg-sky-400",
        button: "bg-sky-500 text-slate-950 hover:bg-sky-400",
    },
    red: {
        name: "Red Team",
        chip: "border-rose-400/60 bg-rose-500/10 text-rose-200",
        border: "border-rose-400",
        text: "text-rose-300",
        dot: "bg-rose-400",
        button: "bg-rose-500 text-white hover:bg-rose-400",
    },
};

export function otherTeam(team: Team): Team {
    return team === "blue" ? "red" : "blue";
}