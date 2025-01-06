// Fetch all movies (general discovery)
export const getMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch top-rated movies
export const getTopRatedMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/top-rated', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch movies by a specific production company
export const getMoviesByCompany = async (companyId) => {
  const response = await fetch(`http://localhost:8080/api/movies/company/${companyId}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch recommendations for a specific movie
export const getMovieRecommendations = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}/recommendations`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch trending movies (daily)
export const getTrendingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/trending', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch trending movies (daily)
export const getUpcomingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/upcoming', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};
// Fetch details for a specific actor
export const getActorDetails = async (id) => {
  const response = await fetch(`http://localhost:8080/api/actors/${id}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch movies an actor has appeared in
export const getActorMovies = async (id) => {
  const response = await fetch(`http://localhost:8080/api/actors/${id}/movies`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch cast and crew details for a specific movie
export const getMovieCredits = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}/credits`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch details for a specific movie
export const getMovie = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch genres from the API
export const getGenres = async () => {
  const response = await fetch('http://localhost:8080/api/genres', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch movie images (posters, backdrops, etc.)
export const getMovieImages = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}/images`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch reviews for a specific movie
export const getMovieReviews = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}/reviews`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// User login
export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// User signup
export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ username, password }),
  });
  return response.json();
};
