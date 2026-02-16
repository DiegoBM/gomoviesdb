export class MovieItem extends HTMLElement {
  constructor(movie) {
    super();

    this.movie = movie;
  }

  connectedCallback() {
    const { title, poster_url, release_year } = this.movie;

    this.innerHTML = `
      <a href="#">
        <article>
          <img src="${poster_url}" alt="${title} Poster" />
          <p>${title} (${release_year})</p>
        </article>
      </a>
    `;
  }
}

// Web Component Registration
customElements.define("movie-item", MovieItem);