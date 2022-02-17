import React, { useEffect } from "react";
import genres from "./genres.json";

const Movies = (props) => {
  const images = []
  
  useEffect(() => {
    genres.forEach(async (genre) => {
      const response =await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
        );
        
      const data = await response.json();

      

     images.push(
        data.results.map((arrayOfData) => {
          return `https://image.tmdb.org/t/p/w500/${arrayOfData.poster_path}`;
        })
      );
    });
  });

  console.log(images);

  return (
    <div>
      {images.map(function(imgSrc) {
        return (
          <li key={imgSrc}>
            <h1>{imgSrc}</h1>
          </li>
        )
      })}
    </div>
  )
};

export default Movies;
