import express from "express";
import {
  register,
  login,
  getUser,
  postFavorite,
  getOneUser,
  logoutUser,
  getAllUsers,
} from "../controllers/controllers.js";

import {
  getPopularMovies,
  getTopratedMovies,
  getNowplayingMovies,
  getMoviesFrontpage,
  getOneMovie,
  getProviders,
  getCredits,
  getSimilar,
} from "../controllers/themoviedb.js";

const router = express.Router();

//internal calls
router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);
router.get("/getallusers", getAllUsers);
router.get("/getoneuser/:username", getOneUser);
router.post(
  "/post-favorite/:movie_id/:movie_title/:movie_poster/:username",
  postFavorite
);
router.delete("/logout", logoutUser);

//tmdb calls
router.get("/popular-movies", getPopularMovies);
router.get("/toprated-movies", getTopratedMovies);
router.get("/nowplaying-movies", getNowplayingMovies);
router.get("/frontpage-movies", getMoviesFrontpage);
router.get("/getonemovie/:movie", getOneMovie);
router.get("/getproviders/:movie", getProviders);
router.get("/getcredits/:movie", getCredits);
router.get("/getsimilar/:movie", getSimilar);

export default router;
