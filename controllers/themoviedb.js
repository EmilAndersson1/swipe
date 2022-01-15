import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

export const getNowplayingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
  }
};
export const getMoviesFrontpage = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: { api_key: process.env.API_KEY, page: 2 },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getOneMovie = async (req, res) => {
  console.log(req.params.movie);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.movie}`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(404).send("no movie");
  }
};
export const getProviders = async (req, res) => {
  console.log(req.params.movie);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.movie}/watch/providers`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data.results);
  } catch (error) {
    res.status(404).send("no providers");
  }
};
export const getCredits = async (req, res) => {
  console.log(req.params.movie);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.movie}/credits`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(404).send("no providers");
  }
};
export const getSimilar = async (req, res) => {
  console.log(req.params.movie);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.movie}/similar`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(404).send("no providers");
  }
};

export const getTopratedMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated`,
      {
        params: { api_key: process.env.API_KEY },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
  }
};
