// Custom attributes in Web Components, always need to start with "data-".
// If you don't use "data-" it will work because browsers are super forgiving
// with HTML, but you'd be breaking the rules, and it's not guaranteed to work
// in the future.
// <animated-loading data-elements="5"></animated-loading data-elements="5">
export class AnimatedLoading extends HTMLElement {
  // Attributes need to be read in connectedCallback. When the constructor gets
  // called, the component has not been "parsed" yet
  connectedCallback() {
    const { elements, width, height } = this.dataset;

    for (let i = 0; i < elements ? parseInt(elements) : 0; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("loading-wave");
      wrapper.style.width = width ?? 0;
      wrapper.style.height = height ?? 0;
      wrapper.style.margin = "10px";
      wrapper.style.display = "inline-block";

      this.appendChild(wrapper)
    }
  }
}

// Web Component html tag Registration
customElements.define("animated-loading", AnimatedLoading);