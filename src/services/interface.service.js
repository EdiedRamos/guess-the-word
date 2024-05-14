import {
  getBaseInput,
  updateInputToBase,
  updateInputToCurrent,
} from "../utils/utils.js";

export class InterfaceService {
  constructor() {
    if (InterfaceService.instance) {
      return InterfaceService.instance;
    }

    /**
     * @private
     */
    this.scrambledWordNode = document.getElementById("srambled-word");

    /**
     * @private
     */
    this.triesCounterNode = document.getElementById("tries-counter");

    /**
     * @private
     */
    this.triesContainerNode = document.getElementById("tries-container");

    /**
     * @private
     */
    this.mistakesNode = document.getElementById("mistakes");

    /**
     * @private
     */
    this.inputContainerNode = document.getElementById("input-container");

    /**
     * @private
     */
    this.randonButtonNode = document.getElementById("random-button");

    /**
     * @private
     */
    this.resetButtonNode = document.getElementById("reset-button");

    InterfaceService.instance = this;

    this.addListeners();
  }

  addListeners() {
    this.resetButtonNode.addEventListener("click", this.resetEvent);
    this.inputContainerNode.addEventListener("input", this.insertInputEvent);
  }

  setScrambledWord(scrambledWord) {
    this.scrambledWordNode.textContent = scrambledWord;
  }

  /**
   * Function to render the tries counter
   * @param {number} tries Current tries
   * @param {number} maxTries Maximum number of tries
   * @returns {void}
   */
  setTriesCounter(tries, maxTries) {
    this.triesCounterNode.textContent = `Tries: (${tries}/${maxTries}):`;
  }

  /**
   * Function to render the tries circles
   * @param {number} maxTries Maximum number of tries
   */
  setTriesCircles(maxTries) {
    this.triesContainerNode.innerHTML = "";
    for (let i = 0; i < maxTries; i++) {
      const circleNode = document.createElement("div");
      circleNode.classList.add("machine__tries");
      this.triesContainerNode.appendChild(circleNode);
    }
  }

  /**
   * Function to paint the tries circles
   * @param {number} mistakes
   * @returns {void}
   */
  setTriesCirclesUsed(mistakes) {
    const circles = this.triesContainerNode.children;
    if (mistakes > circles.length) throw new Error("Mistakes out of bound");
    for (let i = 0; i < mistakes; i++) {
      circles[i].classList.add("machine__tries--used");
    }
  }

  /**
   * Function to render the mistakes
   * @param {string[]} mistakes
   * @returns {void}
   */
  renderMistakes(mistakes) {
    this.mistakesNode.textContent =
      mistakes.length > 0 ? mistakes.join(", ") : "🤞";
  }

  /**
   *
   * @param {number} length Number of inputs
   */
  setInitialInputs(length) {
    this.inputContainerNode.innerHTML = "";
    for (let i = 0; i < length; i++) {
      const inputNode = getBaseInput();
      this.inputContainerNode.appendChild(inputNode);
    }
  }

  setCurrentInput(index) {
    console.log({ check: this.inputContainerNode.children });

    if (index > 0) {
      updateInputToBase(this.inputContainerNode.children[index - 1]);
    }

    const currentInput = this.inputContainerNode.children[index];
    updateInputToCurrent(currentInput);
  }

  randomEventListener(callback) {
    this.randonButtonNode.addEventListener("click", callback);
  }

  resetEventListener(callback) {
    this.resetButtonNode.addEventListener("click", callback);
  }

  /**
   * @private
   */
  insertInputEvent(event) {
    console.log(event);
    if (!event) return;
    let { value } = event.target;
    if (!/[a-zA-Z]/.test(value)) {
      event.target.value = "";
      return;
    }
    setTimeout(() => {
      event.target.value = "";
    }, 1000);
  }
}

export const interfaceService = new InterfaceService();
