import { routes } from "./Routes.js";

// Router singleton
export const Router = {
  init: function () {
    // popstate fires when we are going back in the history
    window.addEventListener("popstate", function () {
      Router.go(window.location.pathname, false);
    });

    // Enhance menu links
    // document.querySelectorAll("a.navlink").forEach(a => {
    //   a.addEventListener("click", event => {
    //     event.preventDefault();
    //     const href = a.getAttribute("href");
    //     Router.go(href);
    //   });
    // })

    // Go to the initial route
    Router.go(window.location.pathname + window.location.search);
  },
  go: function (route, addToHistory = true) {
    if (addToHistory) {
      window.history.pushState(null, "", route)
    } else {
      window.history.replaceState(null, "", route);
    }

    let pageElement = null;

    // Try to find a matching route/componen
    const routePath = route.includes("?") ? route.split("?")[0] : route;
    for (const entry of routes) {
      if (typeof entry.path === "string" && entry.path === routePath) {
        pageElement = new entry.component();
        break;
      } else if (entry.path instanceof RegExp) {
        const match = entry.path.exec(route);
        if (match) {
          // pageElement = new entry.component();
          // const params = match.slice(1);
          // pageElement.params = params;
          const params = match.slice(1);
          pageElement = new entry.component(params);
          break;
        }
      }
    }

    const mainElement = document.querySelector("main");
    if (mainElement) {

      if (pageElement == null) {
        // 404 page
        pageElement = document.createElement("h1");
        pageElement.textContent = "Page not found";
      }

      function updatePage() {
        mainElement.innerHTML = "";
        mainElement.appendChild(pageElement);
      }

      const oldPage = mainElement.firstElementChild;
      if (oldPage && document.startViewTransition) {
        oldPage.style.viewTransitionName = "old";
        pageElement.style.viewTransitionName = "new";
        document.startViewTransition(updatePage)
      } else {
        updatePage()
      }

    }
  }
}