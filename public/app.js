import { API } from "./services/API.js";
import { Router } from "./services/Router.js";
import Store from "./services/Store.js";
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

async function register(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const name = data.get("register-name");
  const email = data.get("register-email");
  const password = data.get("register-password");
  const passwordConfirm = data.get("register-password-confirmation");

  const errors = [];
  if (name.length < 4) {
    errors.push("Enter your complete name");
  }
  if (password.length < 7) {
    errors.push("Enter a passwords with at least 7 characters");
  }
  if (email.length < 4) {
    errors.push("Enter your complete email");
  }
  if (password != passwordConfirm) {
    errors.push("Passwords do not match");
  }

  if (errors.length === 0) {
    const response = await API.register(name, email, password);
    if (response.success) {
      app.Store.jwt = response.jwt;
      app.Router.go("/account", false);
    } else {
      app.showError(response.message, false);
    }
  } else {
    app.showError(errors.join(", "), false);
  }
}

async function login(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const response = await API.login(data.get("login-email"), data.get("login-password"));
  if (response.success) {
    app.Store.jwt = response.jwt;
    app.Router.go("/account", false);
  } else {
    app.showError(response.message, false);
  }
}

function logout() {
  app.Store.jwt = null;
  app.Router.go("/", false);
}

async function saveToCollection(movie_id, collection) {
  if (app.Store.loggedIn) {
    try {
      const response = await API.saveToCollection(movie_id, collection);
      if (response.success) {
        switch (collection) {
          case "favorite":
            app.Router.go("/account/favorites")
            break;
          case "watchlist":
            app.Router.go("/account/watchlist")
        }
      } else {
        app.showError("We couldn't save the movie.")
      }
    } catch (e) {
      console.log(e)
    }
  } else {
    app.Router.go("/account/");
  }
}

window.app = {
  Store,
  Router,
  search,
  searchFilterChange,
  searchOrderChange,
  showError,
  closeError,
  register,
  login,
  logout,
  saveToCollection
}

window.addEventListener("DOMContentLoaded", () => {
  app.Router.init()
})