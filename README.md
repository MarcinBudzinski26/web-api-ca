# Assignment 2 - Web API.

Name: Marcin Budzinski

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Added protective routes for deleting users.
 + User Management: Added functionality to register, login, delete accounts, attempted to update passwords (not working).
 + Actor Details: Created endpoints to fetch actor details and the movies they have appeared in.
 + Production Company Movies: Implemented endpoints to retrieve movies associated with a specific production company.
 + Trending and Top-Rated Movies: Added routes to fetch trending movies (daily) and top-rated movies from TMDB.
 + Error Handling: Enhanced error-handling mechanism across all routes for better debugging and error responses.
 + Integration with MongoDB: Ensured persistent data storage and retrieval for user authentication.
 + Custom Validation: Added password validation rules to ensure strong passwords during registration and updates.

## Setup requirements.

+ npm install
+ npm start

## API Configuration
+ For front end .env
+ REACT_APP_TMDB_KEY=TMDB Key 
+ FAST_REFRESH=false

+ For back end .env
+ NODE_ENV=development
+ PORT=8080
+ HOST=localhost
+ MONGO_DB=MongoDBLinkHere
+ TMDB_KEY=TMDBKeyHere
+ SECRET=ilikecake


## API Design
+ Movie Endpoints
+ /api/movies | GET | Get a paginated list of movies.
+ /api/movies/{id} | GET | Get details for a specific movie.
+ /api/movies/{id}/images | GET | Get images for a specific movie.
+ /api/movies/tmdb/toprated | GET | Get a list of top-rated movies.
+ /api/movies/tmdb/upcoming | GET | Get a list of upcoming movies.
+ /api/movies/tmdb/trending | GET | Get trending movies for the day.
+ /api/movies/company/{id} | GET | Get movies produced by a specific company.

+ Actor Endpoints
+ /api/movies/tmdb/actor/{id} | GET | Get details for a specific actor.
+ /api/movies/tmdb/actor/{id}/movies | GET | Get all movies an actor has appeared in.

+ User Endpoints
+ /api/users | POST | Register or login a user.
+ /api/users/{id} | DELETE | Delete a user by ID.

## Security and Authentication

+ Tokens are required for protected routes.
+ The Authorization header must include Bearer <token> to access protected route.
+ Protected Routes:
+ /api/users/{id} (DELETE)


## Integrating with React App

+ Integrating with React App
+ The React app uses the Web API for all backend data instead of directly using TMDB. For example:
+ Fetching movies, actors, and details.
+ Adding and managing user accounts, including login, registration and deleting accounts.
+ Updated Views:
+ Login Page: Integrated with /api/users for user authentication.
+ Signup Page: Integrated with /api/users?action=register for user registration.
+ Dashboard: Allows users to delete accounts via /api/users/{id}.
+ Actor Details Page: Fetches actor details and their movies via /api/movies/tmdb/actor/{id} and /api/movies/tmdb/actor/{id}/movies.

## Independent learning (if relevant)

+ MongoDB Integration: Enhanced understanding of MongoDB for storing and managing user data and reviews.
+ Advanced Error Handling: Improved error handling in the API to provide clear and helpful feedback to users.
+ Custom Validation: Implemented password validation logic to enforce strong passwords during registration and updates.

## Attempted but failed due to time contraints
+ Add update password feature on the user dashboard through usage of token/user id
+ Failed to route reviews favorites/must watch to backend