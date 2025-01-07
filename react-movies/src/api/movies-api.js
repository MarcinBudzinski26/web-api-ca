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
  const response = await fetch('http://localhost:8080/api/movies/tmdb/toprated', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch movies by a specific production company
export const getMoviesByCompany = async (companyId) => {
  const response = await fetch(`http://localhost:8080/api/movies/tmdb/company/${companyId}/movies`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch movies by company.");
  }

  return response.json();
};


// Fetch recommendations for a specific movie
export const getMovieRecommendations = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/recommendations`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch trending movies (daily)
export const getTrendingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/trending', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch upcoming movies
export const getUpcomingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/upcoming', {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch details for a specific actor
export const getActorDetails = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/tmdb/actor/${id}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch actor details.");
  }

  return response.json();
};

// Fetch movies an actor has appeared in
export const getActorMovies = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/tmdb/actor/${id}/movies`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch actor movies.");
  }

  return response.json();
};


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
  const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token'),
      },
  });
  return response.json();
};

// Fetch genres from the API
export const getGenres = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/genres', {
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
  if (!id) {
      throw new Error("Movie ID is undefined.");
  }
  const response = await fetch(`http://localhost:8080/api/movies/${id}/reviews`, {
      headers: {
          Authorization: window.localStorage.getItem("token"),
      },
  });
  return response.json();
};


export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Login failed.");
  }

  return await response.json(); // Return { success, userId, token }
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

export const updatePassword = async (id, password) => {
  const response = await fetch(`http://localhost:8080/api/users/${id}/password`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ password }),
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Failed to update password.');
  }

  return response.json();
};


// Delete a user by ID
export const deleteUser = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user.");
  }

  return response.json();
};

