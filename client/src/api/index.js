import axios from "axios";

const serverUrl = "http://localhost:8000/api";

export const getOneUser = (username) =>
  axios.get(`${serverUrl}/getoneuser/${username}`);

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

export const login = (loginData) => {
  console.log(loginData);
  axios({
    method: "POST",
    data: loginData,
    withCredentials: true,
    url: `${serverUrl}/login`,
  }).then((res) => {
    console.log(res.data);
    if (res.data === "success") {
      window.location.replace("/");
    }
  });
};

export const register = (registerData) => {
  console.log(registerData);
  axios({
    method: "POST",
    data: registerData,
    withCredentials: true,
    url: `${serverUrl}/register`,
  }).then((res) => {
    console.log(res.data);
  });
};

export const getPopularMovies = () => axios.get(`${serverUrl}/popular-movies`);

export const getNowplayingMovies = () =>
  axios.get(`${serverUrl}/nowplaying-movies`);

export const getTopratedMovies = () =>
  axios.get(`${serverUrl}/toprated-movies`);

export const postFavorite = (movie_id, movie_title, movie_poster, username) => {
  axios.post(
    `${serverUrl}/post-favorite/${movie_id}/${movie_title}/${movie_poster}/${username}`
  );
};
