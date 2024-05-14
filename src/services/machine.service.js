import { InterfaceService } from "./interface.service.js";
import { JSConfetti } from "../libs/confetti.js";
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
    this.interfaceService.inputEventListener((event) =>
      this.guessingLetter(event)
    );

    this.resetWord();
    this.resetWordScrambled();

    this.confetti = new JSConfetti();

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
   * @param {HTMLInputElement} event
   * @returns {void}
   */
  guessingLetter(event) {
    const letter = event.target.value;
    if (typeof letter !== "string") return;
    const isTheCorrectLetter =
      this.word[this.currentIndex].toLowerCase() === letter.toLowerCase();
    isTheCorrectLetter ? this.guessedLetter() : this.attemptedLetter(event);
  }

  /**
   * Correct letter logic
   * @returns {void}
   */
  guessedLetter() {
    const areRemainingLetters = ++this.currentIndex < this.word.length;

    if (areRemainingLetters) {
      this.interfaceService.setCurrentInput(this.currentIndex);
    } else {
      this.confetti.addConfetti();
      this.nextGame();
    }
  }

  /**
   * Wrong letter logic
   * @param {HTMLInputElement} event
   * @returns {void}
   * @private
   */
  attemptedLetter(event) {
    this.tries++;
    this.mistakes.push(event.target.value);

    if (this.tries > this.MAX_TRIES) {
      this.resetGame();
      return;
    }

    this.interfaceService.renderMistakes(this.mistakes);
    this.interfaceService.setTriesCounter(this.tries, this.MAX_TRIES);
    this.interfaceService.setTriesCirclesUsed(this.tries);

    setTimeout(() => {
      event.target.value = "";
    }, 500);
  }

  onRandom() {
    this.nextGame();
  }

  onReset() {
    this.resetGame();
  }

  nextGame() {
    this.currentIndex = 0;
    this.resetWord();
    this.resetWordScrambled();

    this.interfaceService.setScrambledWord(this.wordScrambled);
    this.interfaceService.setInitialInputs(this.word.length);
    this.interfaceService.setCurrentInput(this.currentIndex);
  }

  resetGame() {
    this.mistakes = [];
    this.currentIndex = 0;
    this.tries = 0;
    this.resetWord();
    this.resetWordScrambled();

    this.interfaceService.setScrambledWord(this.wordScrambled);
    this.interfaceService.setInitialInputs(this.word.length);
    this.interfaceService.setTriesCounter(this.tries, this.MAX_TRIES);
    this.interfaceService.setTriesCircles(this.MAX_TRIES);
    this.interfaceService.renderMistakes(this.mistakes);
    this.interfaceService.setCurrentInput(this.currentIndex);
  }
}
