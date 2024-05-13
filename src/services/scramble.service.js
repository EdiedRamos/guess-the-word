import { WordsService } from "./words.service.js";

export const ScrambleService = {
  // this function implement the Fisher-Yates algorithm 👌 https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  toScrambled(word) {
    const wordArray = [...word];
    for (let i = wordArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[randomIndex]] = [
        wordArray[randomIndex],
        wordArray[i],
      ];
    }
    return wordArray.join("");
  },

  getScrambledWord() {
    const randonWord = WordsService.getRandomWord();
    return {
      original: randonWord,
      scrambled: this.toScrambled(randonWord),
    };
  },
};
