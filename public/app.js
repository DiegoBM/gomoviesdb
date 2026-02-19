import { API } from "./services/API.js";
import { Router } from "./services/Router.js";
// Import that triggers the component registration, since this components are not
// being instantiated using JavaScript, but directly from HTML tags
import "./components/AnimatedLoading.js";
import "./components/YouTubeEmbed.js";
import "./components/NavLink.js"

const selectors = {
  searchBox: "input[type=search]"
};

const ids = {
  modal: "alert-modal",
  modalMessage: "alert-modal-message"
};

/**
 * Search event handler
 * @param {SubmitEvent} event - Form submit event
 * @returns void
 */
function search(event) {
  event.preventDefault();

  /** @type { HTMLInputElement | null } */
  const searchBox = document.querySelector(selectors.searchBox);
  const q = searchBox ? searchBox.value : '';
  window.app.Router.go("/movies?q=" + q);
}

function searchFilterChange(value) {
  const searchParams = new URLSearchParams(window.location.search);
  if (isNaN(value)) {
    searchParams.delete("genre");
  } else {
    searchParams.set("genre", value);
  }
  window.app.Router.go(window.location.pathname + '?' + searchParams.toString());
}

function searchOrderChange(value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("order", value);
  window.app.Router.go(window.location.pathname + '?' + searchParams.toString());
}

function showError(message = "There was an error", goToHome = true) {
  /** @type { HTMLDialogElement | null } */
  const dialogElement = document.getElementById(ids.modal);
  if (dialogElement) {
    /** @type { HTMLParagraphElement | null } */
    const messageElement = document.getElementById(ids.modalMessage);
    if (messageElement) {
      messageElement.textContent = message;
    }

    dialogElement.showModal();

    if (goToHome) {
      window.app.Router.go("/");
    }
  }
}

function closeError() {
  /** @type { HTMLDialogElement | null } */
  const dialogElement = document.getElementById(ids.modal);
  if (dialogElement) {
    dialogElement.close();
  }
}

window.app = {
  Router,
  search,
  searchFilterChange,
  searchOrderChange,
  showError,
  closeError,
  api: API
}

window.addEventListener("DOMContentLoaded", () => {
  app.Router.init()
})