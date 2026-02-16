import { API } from "./services/API.js";

import { HomePage } from "./components/HomePage.js";

/**
 * Search event handler
 * @param {SubmitEvent} event - Form submit event
 * @returns void
 */
function search(event) {
  event.preventDefault();

  /** @type {HTMLInputElement | null} */
  const searchBox = document.querySelector("input[type=search]");
  const q = searchBox ? searchBox.value : '';
}

window.app = {
  search,
  api: API
}

window.addEventListener("DOMContentLoaded", () => {
  // Programmatically instantiate a Web Component
  document.querySelector("main").appendChild(new HomePage());
})