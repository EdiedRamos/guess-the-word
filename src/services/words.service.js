import { WORDS } from "../data/words.js";

export class WordsService {
  /**
   * @private
   */
  getRandomIndex() {
    return Math.floor(Math.random() * this.getDataLength());
  }

  /**
   * @private
   */
  getDataLength() {
    return WORDS.length;
  }

  /**
   * @private
   */
  getNthWord(index) {
    if (index < 0 || index >= this.getDataLength())
      throw new Error("Index out of bound");
    return WORDS[index];
  }

  /**
   *
   * @returns {string} random
   */
  getRandomWord() {
    return this.getNthWord(this.getRandomIndex());
  }

  /**
   * Function to scramble a word using the Fisher-Yates algorithm
   * 👌 https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   * @param {string} word word to be scrambled
   * @returns {string} scrambled word
   */
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
  }
}
