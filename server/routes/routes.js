import express from "express";
import {
  register,
  login,
  getUser,
  postFavorite,
  getOneUser,
  logoutUser,
} from "../controllers/controllers.js";

import {
  getPopularMovies,
  getTopratedMovies,
  getNowplayingMovies,
} from "../controllers/themoviedb.js";

const router = express.Router();

//internal calls
router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);
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

export default router;
