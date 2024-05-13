/**
 * Function to return an input element with the needed configuration for the game
 * @returns {HTMLInputElement} input element with the custom configuration
 */
export function getBaseInput() {
  const inputElement = document.createElement("input");
  inputElement.maxLength = 1;
  inputElement.type = "text";
  inputElement.disabled = true;
  inputElement.classList.add("machine__input");
  return inputElement;
}

/**
 * Function to mutate an input element with the current configuration
 * @param {HTMLInputElement} currentInput Current input element with the standard base configuration
 * @returns {void}
 */
export function updateInputToCurrent(currentInput) {
  currentInput.classList.add("machine__input--current");
  currentInput.disabled = false;
  currentInput.placeholder = "_";
  currentInput.focus();
}

/**
 * Function to mutate an input element with the base configuration after being mutated
 * @param {HTMLInputElement} currentInput Current input element with the current configuration
 * @returns {void}
 */
export function updateInputToBase(currentInput) {
  currentInput.classList.remove("machine__input--current");
  currentInput.disabled = true;
  currentInput.placeholder = "";
}
