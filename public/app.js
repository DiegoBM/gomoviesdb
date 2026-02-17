import { API } from "./services/API.js";
import { Router } from "./services/Router.js";
// Import that triggers the component registration, since this components are not
// being instantiated using JavaScript, but directly from HTML tags
import "./components/AnimatedLoading.js";
import "./components/YouTubeEmbed.js";
import "./components/NavLink.js"

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
  Router,
  search,
  api: API
}

window.addEventListener("DOMContentLoaded", () => {
  app.Router.init()
})