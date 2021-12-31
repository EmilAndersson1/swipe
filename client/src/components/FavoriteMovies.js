import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";

import Paper from "@mui/material/Paper";

const FavoriteMovies = ({ movies }) => {
  console.log(movies);
  return (
    <Swiper spaceBetween={50} slidesPerView={6} style={{ paddingLeft: 65 }}>
      {movies.map((movie, i) => (
        <SwiperSlide style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Paper
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
              opacity: 1,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "22vh",
              backgroundImage: `url(
                https://image.tmdb.org/t/p/original/${movie.movie_poster}
              )`,
            }}
          ></Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FavoriteMovies;
