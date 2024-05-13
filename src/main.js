import { ScrambleService } from "./services/scramble.service.js";
import { interfaceService } from "./services/interface.service.js";

function main() {
  const scrambled = ScrambleService.getScrambledWord();
  // console.log(`${scrambled.original} ${scrambled.scrambled}`);
  interfaceService.setScrambledWord(scrambled.scrambled);
  interfaceService.setTriesCounter(0);
  interfaceService.setTriesCircles();
  interfaceService.addMistake();
  interfaceService.setInitialInputs(scrambled.original.length);
  interfaceService.addListeners();
  interfaceService.setCurrentInput(0);
  interfaceService.setCurrentInput(1);
}

document.addEventListener("DOMContentLoaded", main);
