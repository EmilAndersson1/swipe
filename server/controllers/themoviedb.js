import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

export const getNowplayingMovies = async (req, res) => {};

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

export const getTopratedMovies = async (req, res) => {};
