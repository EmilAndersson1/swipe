import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Image } from "mui-image";
import { motion } from "framer-motion";

import "swiper/swiper.scss";
import { useNavigate } from "react-router-dom";

const Popular = (props) => {
  const [movies, setMovies] = useState([]);
  const arraySkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();

  useEffect(() => {
    setMovies(props.movies);
  }, [props]);
  return (
    <>
      <Box>
        <Swiper
          style={{ paddingTop: 30, paddingLeft: 30 }}
          spaceBetween={30}
          breakpoints={{
            299: { slidesPerView: 2, spaceBetween: 30 },
            399: { slidesPerView: 2, spaceBetween: 30 },
            499: { slidesPerView: 3, spaceBetween: 30 },
            599: { slidesPerView: 3, spaceBetween: 30 },
            699: { slidesPerView: 4, spaceBetween: 30 },
            799: { slidesPerView: 5, spaceBetween: 30 },
            899: { slidesPerView: 6, spaceBetween: 25 },
            999: { slidesPerView: 7, spaceBetween: 20 },
            2000: { slidesPerView: 8, spaceBetween: 20 },
          }}
        >
          {movies.length === 0
            ? arraySkeleton.map((x, i) => (
                <SwiperSlide key={i}>
                  <Skeleton variant="rectangular" height={"12em"} />

                  <Typography variant="h5">
                    <Skeleton sx={{ mt: 1 }} />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton width={"80%"} />
                  </Typography>
                </SwiperSlide>
              ))
            : movies.map((movie, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "rgba(200, 200, 200, 0.4) 0px 8px 24px",
                    }}
                  >
                    <Image
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                      sx={{
                        boxShadow: "rgba(90, 90, 90, 0.4) 0px 8px 24px",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    />
                  </motion.div>
                  <Typography sx={{ mt: 1, fontWeight: 600 }} variant="body1">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {movie.release_date.substring(0, 4)}
                  </Typography>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Popular;
