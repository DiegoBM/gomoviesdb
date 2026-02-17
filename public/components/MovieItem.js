export class MovieItem extends HTMLElement {
  constructor(movie) {
    // When you override the constructor, you MUST call "super()" first
    super();

    this.movie = movie;
  }

  connectedCallback() {
    const { id, title, poster_url, release_year } = this.movie;

    // this.innerHTML = `
    //   <a href="#" onclick="arguments[0].preventDefault();app.Router.go('/movies/${id}')">
    //     <article>
    //       <img src="${poster_url}" alt="${title} Poster" />
    //       <p>${title} (${release_year})</p>
    //     </article>
    //   </a>
    // `;
    this.innerHTML = `
      <nav-link data-url="/movies/${id}">
        <article>
          <img src="${poster_url}" alt="${title} Poster" />
          <p>${title} (${release_year})</p>
        </article>
      </nav-link>
    `;
  }
}

// Web Component html tag Registration
customElements.define("movie-item", MovieItem);