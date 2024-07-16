import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import { width } from "@mui/system";
import movieTrailer from "movie-Trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovie] = useState([]);
  const [TrailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);
        //  const request = await axios.get(`http://localhost:4000/api/${fetchUrl}`);
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchUrl]);

  const handleclick = (movie) => {
    if (TrailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          console.log(url);
          const urlparams = new URLSearchParams(new URL(url).search);
          console.log(urlparams);
          console.log(urlparams.get("v"));
          setTrailerUrl(urlparams.get("v"));
        }
      );
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playervars: {
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h2 style={{ padding: "5px" }}>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleclick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            classname={`row_poster${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: "10px" }}>
        {TrailerUrl && <YouTube videoId={TrailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
