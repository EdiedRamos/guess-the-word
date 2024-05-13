import { WordsService } from "./words.service.js"

export const ScrambleService = {
  getRandomWord() {
    return WordsService.getNthWord(20);
  }
}