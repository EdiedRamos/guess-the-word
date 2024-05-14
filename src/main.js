import { MachineService } from "./services/machine.service.js";
import { WordsService } from "./services/words.service.js";
import { interfaceService } from "./services/interface.service.js";

function main() {
  // console.log(`${scrambled.original} ${scrambled.scrambled}`);
  // interfaceService.setScrambledWord(scrambled.scrambled);
  // interfaceService.setTriesCounter(0);
  // interfaceService.setTriesCircles();
  // interfaceService.renderMistakes(["a", "b", "c"]);
  // interfaceService.setInitialInputs(scrambled.original.length);
  // interfaceService.addListeners();
  // interfaceService.setCurrentInput(0);
  // interfaceService.setTriesCirclesUsed(1);
  // interfaceService.randomEventListener(() => console.log("JAJAJAJ"));
  // interfaceService.resetEventListener(() => console.log("JOJOJO"));

  const wordService = new WordsService();
  const machineService = new MachineService(interfaceService, wordService);
  machineService.resetGame();
}

document.addEventListener("DOMContentLoaded", main);
