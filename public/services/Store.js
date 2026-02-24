const JWT_STORE_KEY = "jwt";

class Store {
  #jwt = null;

  constructor(value) {
    this.#jwt = value;
  }

  get jwt() {
    return this.#jwt;
  }

  set jwt(value) {
    this.#jwt = value;
    if (value === null) {
      localStorage.removeItem(JWT_STORE_KEY);
    } else {
      localStorage.setItem(JWT_STORE_KEY, value);
    }
  }

  loggedIn() {
    return this.#jwt != null
  }
}

// Grab the stored jwt upon initialization if it exists
const storedJwt = localStorage.getItem(JWT_STORE_KEY)
// and initialize the store with it (or null if there wasn't one)
const store = new Store(storedJwt);

// Return the store singleton
export default store;