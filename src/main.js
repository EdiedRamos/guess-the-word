import { MachineService } from "./services/machine.service.js";
import { WordsService } from "./services/words.service.js";
import { interfaceService } from "./services/interface.service.js";

function main() {
  const wordService = new WordsService();
  const machineService = new MachineService(interfaceService, wordService);
  machineService.resetGame();
}

document.addEventListener("DOMContentLoaded", main);
