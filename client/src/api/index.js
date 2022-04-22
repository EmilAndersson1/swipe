import axios from "axios";

const serverUrl = "http://localhost:8000/api";

//detta är ett test

export const getOneUser = (username) =>
  axios.get(`${serverUrl}/getoneuser/${username}`);

export const getOneMovie = async (movie) => {
  try {
    const res = await axios.get(`${serverUrl}/getonemovie/${movie}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllUsers = () => axios.get(`${serverUrl}/getallusers`);

export const logout = () => {
  axios({
    method: "DELETE",
    withCredentials: true,
    url: `${serverUrl}/logout`,
  }).then((res) => {
    window.location = "/";
  });
};

export const getUser = () =>
  axios.get(`${serverUrl}/user`, { withCredentials: true });

export const login = async (loginData) => {
  try {
    const res = await axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: `${serverUrl}/login`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (registerData) => {
  try {
    const res = await axios({
      method: "POST",
      data: registerData,
      withCredentials: true,
      url: `${serverUrl}/register`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPopularMovies = () => axios.get(`${serverUrl}/popular-movies`);

export const getProviders = (movie) =>
  axios.get(`${serverUrl}/getproviders/${movie}`);

export const getCredits = (movie) =>
  axios.get(`${serverUrl}/getcredits/${movie}`);

export const getSimilar = (movie) =>
  axios.get(`${serverUrl}/getsimilar/${movie}`);

export const getNowplayingMovies = () =>
  axios.get(`${serverUrl}/nowplaying-movies`);

export const getTopratedMovies = () =>
  axios.get(`${serverUrl}/toprated-movies`);

export const postFavorite = (movie_id, movie_title, movie_poster, username) => {
  axios.post(
    `${serverUrl}/post-favorite/${movie_id}/${movie_title}/${movie_poster}/${username}`
  );
};
