async function apiFetch(serviceName, options) {
  const queryString = options?.args ? `?${(new URLSearchParams(options.args)).toString()}` : '';;
  let headers = { ...options?.headers, ...(options?.body && { "Content-Type": "application/json" }) }

  try {
    let url = `/api${serviceName}${queryString}`;
    return await fetch(url, {
      method: options?.method ?? "GET",
      ...(headers && { headers }),
      ...(options?.body && { body: JSON.stringify(options.body) }),
    }).then(res => res.json());
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function getGenres() {
  return apiFetch("/genres");
}

function getTopMovies() {
  return apiFetch("/movies/top");
}

function getRandomMovies() {
  return apiFetch("/movies/random");
}

function getMovieById(id) {
  return apiFetch(`/movies/${id}`);
}

function searchMovies(q, order, genre) {
  return apiFetch(`/movies/search`, { args: { q, order, genre } });
}

async function register(name, email, password) {
  return apiFetch(`/account/register`, {
    method: "POST", body: { name, email, password }
  });
}

async function login(email, password) {
  return apiFetch(`/account/authenticate`, {
    method: "POST", body: { email, password }
  });
}

async function getFavorites() {
  return apiFetch(`/account/favorites`, {
    headers: { "Authorization": `Bearer ${app.Store.jwt}` }
  });
}

async function getWatchlist() {
  return apiFetch(`/account/watchlist`, {
    headers: { "Authorization": `Bearer ${app.Store.jwt}` }
  });
}

async function saveToCollection(movieId, collection) {
  return apiFetch(`/account/save-to-collection`, {
    method: "POST",
    body: { movie_id: movieId, collection },
    headers: { "Authorization": `Bearer ${app.Store.jwt}` }
  });
}

export const API = {
  getGenres,
  getTopMovies,
  getRandomMovies,
  getMovieById,
  searchMovies,
  register,
  login,
  getFavorites,
  getWatchlist,
  saveToCollection
}