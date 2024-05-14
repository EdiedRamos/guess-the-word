import { InterfaceService } from "./interface.service.js";
import { WordsService } from "./words.service.js";

export class MachineService {
  /**
   * MachineService constructor
   * @param {InterfaceService} interfaceService
   * @param {WordsService} wordsService
   */
  constructor(interfaceService, wordsService) {
    this.interfaceService = interfaceService;
    this.wordsService = wordsService;

    this.interfaceService.randomEventListener(() => this.onRandom());
    this.interfaceService.resetEventListener(() => this.onReset());

    this.resetWord();
    this.resetWordScrambled();

    /**
     * Maximum tries allowed
     * @type {number}
     */
    this.MAX_TRIES = 5;

    /**
     * Tries counter
     * @type {number}
     * @private
     */
    this.tries = 0;

    /**
     * Incorrect letters store
     * @type {number[]}
     * @private
     */
    this.mistakes = [];

    /**
     * Current letter position
     * @type {number}
     * @private
     */
    this.currentIndex = 0;
  }

  resetWord() {
    this.word = this.wordsService.getRandomWord();
  }

  resetWordScrambled() {
    this.wordScrambled = this.wordsService.toScrambled(this.word);
  }

  /**
   * Check if the current letter is correct
   * @param {str} letter
   * @returns {void}
   */
  guessingLetter(letter) {
    const isTheCorrectLetter = this.word[this.currentIndex] === letter;
    isTheCorrectLetter ? this.guessedLetter() : this.attemptedLetter();
  }

  /**
   * Correct letter logic
   * @returns {void}
   */
  guessedLetter() {
    const areRemainingLetters = ++this.currentIndex < this.word.length;

    if (areRemainingLetters) {
      // next letter logic goes here
    } else {
      // winner logic goes here
    }
  }

  /**
   * Wrong letter logic
   * @returns {void}
   * @private
   */
  attemptedLetter() {}

  onRandom() {
    this.currentIndex = 0;
    this.resetWord();
    this.resetWordScrambled();

    this.interfaceService.setScrambledWord(this.wordScrambled);
    this.interfaceService.setInitialInputs(this.word.length);
    this.interfaceService.setCurrentInput(this.currentIndex);
  }

  onReset() {
    this.resetGame();
  }

  resetGame() {
    this.currentIndex = 0;
    this.tries = 0;
    this.resetWord();
    this.resetWordScrambled();

    this.interfaceService.setScrambledWord(this.wordScrambled);
    this.interfaceService.setInitialInputs(this.word.length);
    this.interfaceService.setTriesCounter(this.tries, this.MAX_TRIES);
    this.interfaceService.setTriesCircles(this.MAX_TRIES);
    this.interfaceService.renderMistakes([]);
    this.interfaceService.setCurrentInput(this.currentIndex);
  }
}
