import { ScrambleService } from "./services/scramble.service.js";

function main() {
  alert(ScrambleService.getRandomWord());
}

document.addEventListener("DOMContentLoaded", main);