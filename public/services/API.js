async function apiFetch(serviceName, args) {
  const queryString = args ? `?${(new URLSearchParams(args)).toString()}` : '';

  try {
    let url = `/api${serviceName}${queryString}`;
    return await fetch(url).then(res => res.json());
  } catch (e) {
    console.error(e);
  }
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
  return apiFetch(`/movies/search`, { q, order, genre });
}

export const API = {
  getTopMovies,
  getRandomMovies,
  getMovieById,
  searchMovies,
}