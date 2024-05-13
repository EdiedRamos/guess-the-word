import { ScrambleService } from "./services/scramble.service.js";

function main() {
  const scrambled = ScrambleService.getScrambledWord();
  alert(`${scrambled.original} ${scrambled.scrambled}`);
}

document.addEventListener("DOMContentLoaded", main);
