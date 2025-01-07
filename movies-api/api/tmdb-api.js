import fetch from 'node-fetch';

// Fetch all movies (general discovery)
export const getMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch top-rated movies from TMDB
export const getTopRatedMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


// Fetch movies by a specific production company
export const getMoviesByCompany = async (companyId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&with_companies=${companyId}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Alternative method to fetch movies by production company
export const discoverMoviesByCompany = async (companyId) => {
    try {
        const response = await fetch(
            `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_companies=${companyId}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch movies by production company");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch recommendations for a specific movie
export const getMovieRecommendations = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch recommendations");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch trending movies (daily)
export const getTrendingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch details for a specific actor
export const getActorDetails = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch actor details");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch movies an actor has appeared in
export const getActorMovies = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch actor movies");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch cast and crew details for a specific movie
export const getMovieCredits = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch credits");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch details for a specific movie
export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch genres from TMDB
export const getMovieGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch movie images (posters, backdrops, etc.)
export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch reviews for a specific movie
export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
