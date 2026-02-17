export class NavLink extends HTMLElement {
  connectedCallback() {
    const path = this.dataset.url;

    const link = document.createElement("a");
    link.setAttribute("href", path);
    link.innerHTML = this.innerHTML;
    link.addEventListener("click", event => {
      event.preventDefault();
      app.Router.go(path);
    });

    this.innerHTML = "";
    this.appendChild(link);
  }
}

customElements.define("nav-link", NavLink);