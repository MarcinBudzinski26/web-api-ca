import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getMovieGenres,
    getMovies,
    getMovieImages,
    getTopRatedMovies,
    getMoviesByCompany,
    getMovieRecommendations,
    getTrendingMovies,
    getActorDetails,
    getActorMovies,
    getMovieCredits,
    getMovie,
} from '../tmdb-api';

const router = express.Router();

// Fetch all movies with pagination
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit]; // Convert to numbers

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit),
    ]);

    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results,
    };

    res.status(200).json(returnObject);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid movie ID" });
    }
    const reviews = await getMovieReviews(id);
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({ message: "Reviews not found", status_code: 404 });
    }
}));


router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const images = await getMovieImages(id); // Use the tmdb-api.js function
    if (images) {
        res.status(200).json(images);
    } else {
        res.status(404).json({ message: "Images not found", status_code: 404 });
    }
}));

// Get movie details by ID from MongoDB
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Fetch upcoming movies
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    try {
        const upcomingMovies = await getUpcomingMovies();
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Fetch movie genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getMovieGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Fetch trending movies
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    try {
        const trendingMovies = await getTrendingMovies();
        res.status(200).json(trendingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Fetch top-rated movies
router.get('/tmdb/toprated', asyncHandler(async (req, res) => {
    try {
        const topRatedMovies = await getTopRatedMovies();
        res.status(200).json(topRatedMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Fetch recommendations for a specific movie
router.get('/tmdb/:id/recommendations', asyncHandler(async (req, res) => {
    try {
        const recommendations = await getMovieRecommendations(req.params.id);
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Get actor details by ID
router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    try {
        const actorDetails = await getActorDetails(req.params.id);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Get movies an actor has appeared in
router.get('/tmdb/actor/:id/movies', asyncHandler(async (req, res) => {
    try {
        const actorMovies = await getActorMovies(req.params.id);
        res.status(200).json(actorMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const credits = await getMovieCredits(id); // Function from tmdb-api.js
    if (credits) {
        res.status(200).json(credits);
    } else {
        res.status(404).json({ message: "Credits not found", status_code: 404 });
    }
}));


// Get movie details by ID
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    try {
        const movie = await getMovie(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Get movies by a specific production company
router.get('/tmdb/company/:id/movies', asyncHandler(async (req, res) => {
    try {
        const companyMovies = await getMoviesByCompany(req.params.id);
        res.status(200).json(companyMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));


// Fetch all movies (general discovery) with optional pagination
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    try {
        const movies = await getMovies(page, limit); // Update TMDB function to handle pagination
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));


export default router;
