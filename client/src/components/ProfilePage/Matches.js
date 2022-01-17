import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "swiper/swiper.scss";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";

import { Image } from "mui-image";

const Matches = ({ session, movies }) => {
  let navigate = useNavigate();
  console.log(movies);
  console.log(session.favorites);
  return (
    <Swiper
      style={{ paddingLeft: 65 }}
      breakpoints={{
        299: { slidesPerView: 2, spaceBetween: 30 },
        399: { slidesPerView: 2, spaceBetween: 30 },
        499: { slidesPerView: 3, spaceBetween: 30 },
        599: { slidesPerView: 4, spaceBetween: 30 },
        699: { slidesPerView: 5, spaceBetween: 30 },
        799: { slidesPerView: 6, spaceBetween: 30 },
        899: { slidesPerView: 6, spaceBetween: 25 },
        999: { slidesPerView: 7, spaceBetween: 20 },
        2000: { slidesPerView: 7, spaceBetween: 20 },
      }}
    >
      {session.favorites &&
        movies
          .filter((movie) => {
            for (let i = 0; i < session.favorites.length; i++) {
              console.log(movie.movie_id);
              console.log(session.favorites[i].movie_id);
              if (movie.movie_id.includes(session.favorites[i].movie_id))
                return movie;
            }
          })
          .map((movie, i) => (
            <SwiperSlide key={i}>
              <Image
                onClick={() => {
                  navigate(`/movie/${movie.movie_id}`);
                }}
                sx={{
                  boxShadow: "rgba(90, 90, 90, 0.4) 0px 8px 24px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                src={`https://image.tmdb.org/t/p/original/${movie.movie_poster}`}
              />

              <Typography sx={{ mt: 1, fontWeight: 600 }} variant="body1">
                {movie.movie_title}
              </Typography>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default Matches;
