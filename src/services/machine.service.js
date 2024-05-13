export class MachineService {
  /**
   * Maximum tries allowed
   * @type {number}
   */
  static MAX_TRIES = 5;

  /**
   * MachineService constructor
   * @param {string} word
   * @param {string} wordScrambled
   */
  constructor(word, wordScrambled) {
    this.word = word;
    this.wordScrambled = wordScrambled;

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
}
