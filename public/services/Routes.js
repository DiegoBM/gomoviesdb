import { HomePage } from "../components/HomePage.js"
import { MoviesPage } from "../components/MoviesPage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js"

export const routes = [
  { path: "/", component: HomePage },
  { path: /\/movies\/(\d+)/, component: MovieDetailsPage },
  { path: "/movies", component: MoviesPage },
];