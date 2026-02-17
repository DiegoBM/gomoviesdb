import { API } from "../services/API.js";
import { MovieItem } from "./MovieItem.js";

// You don't need to always extend HTMLElement. You could also extend from one
// of the subclasses like HTMLButtonElement, and start from there
export class HomePage extends HTMLElement {
  // Override HTMLElement's "connectedCallback", called when the component is
  // "mounted" in the DOM.
  // "connectedCallback" can't be "async" because that's not the signature of the
  // parent class, that's why we create a "render" method to fetch from the API
  // and render the component
  connectedCallback() {
    // Grab the template from the document
    const template = document.getElementById("tpl-home");
    const content = template.content.cloneNode(true);
    // And insert it into our own Web Component DOM
    this.appendChild(content)
    // Render our own content
    this.render()
  }

  async render() {
    const [topMovies, randomMovies] = await Promise.all([
      API.getTopMovies(),
      API.getRandomMovies(),
    ]);

    renderMoviesInList(topMovies, this.querySelector("#top-10 > ul"));
    renderMoviesInList(randomMovies, this.querySelector("#random > ul"));
  }
}

function renderMoviesInList(movies, list) {
  // Clear the list in case it had something previously
  list.innerHTML = "";

  for (const movie of movies) {
    const listItem = document.createElement("li");
    // Render a new MovieItem Web Component as child
    listItem.appendChild(new MovieItem(movie))
    // Add the item to the list
    list.appendChild(listItem);
  }
}

// Web Component html tag Registration
// Web Component element tags need to have AT LEAST one hyphen in their names
customElements.define('home-page', HomePage);