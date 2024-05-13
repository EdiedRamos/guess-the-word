import {
  getBaseInput,
  updateInputToBase,
  updateInputToCurrent,
} from "../utils/utils.js";

import { MachineService } from "./machine.service.js";

class InterfaceService {
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
  }

  addListeners() {
    this.randonButtonNode.addEventListener("click", this.randomEvent);
    this.resetButtonNode.addEventListener("click", this.resetEvent);
    this.inputContainerNode.addEventListener("input", this.insertInputEvent);
  }

  setScrambledWord(scrambledWord) {
    this.scrambledWordNode.textContent = scrambledWord;
  }

  setTriesCounter(tries) {
    this.triesCounterNode.textContent = `Tries: (${tries}/${MachineService.MAX_TRIES}):`;
  }

  setTriesCircles() {
    for (let i = 0; i < MachineService.MAX_TRIES; i++) {
      const circleNode = document.createElement("div");
      circleNode.classList.add("machine__tries");
      this.triesContainerNode.appendChild(circleNode);
    }
  }

  addMistake() {
    const mock = ["a", "b", "c"];
    this.mistakesNode.textContent = mock.join(", ");
  }

  setInitialInputs(length) {
    for (let i = 0; i < length; i++) {
      const inputNode = getBaseInput();
      // <!-- <input class="machine__input" type="text" value="f" placeholder="_" /> -->
      // if (i === 0) {
      //   inputNode.classList.add("machine__input--current");
      //   inputNode.placeholder = "_";
      //   inputNode.disabled = false;
      // }
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

  /**
   * @private
   */
  randomEvent() {
    console.log("randomEvent");
  }

  /**
   * @private
   */
  resetEvent() {
    console.log("restartEvent");
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
