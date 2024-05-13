import { WORDS } from "../data/words.js";

export const WordsService = {
  getRandomIndex() {
    return Math.floor(Math.random() * this.getDataLength());
  },

  getDataLength() {
    return WORDS.length;
  },

  getNthWord(index) {
    if (index < 0 || index >= this.getDataLength())
      throw new Error("Index out of bound");
    return WORDS[index];
  },

  getRandomWord() {
    return this.getNthWord(this.getRandomIndex());
  },
};
