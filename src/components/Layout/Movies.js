import React, { useEffect, useState, useRef } from "react";
import genres from "./genres.json";
import classes from "./Movies.module.css";

const Movies = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgUrls = () => {
      const promises = genres.map((genre) => {
        return fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
        ).then((response) => response.json());
      });

      Promise.all(promises).then((results) => {
        const baseImgUrl = "https://image.tmdb.org/t/p/w500";
        const images = results.map((result) =>
          result.results.map((poster) => baseImgUrl + poster.poster_path)
        );

        setImages(images);
      });
    };
    imgUrls();
  }, []);

  // useEffect(() => {
  //   if (currentFocus) {
  //     focusRef.current.focus();
  //   }
  // }, [currentFocus]);
  const [focus, setFocus] = useState();
  const focusRef = useRef();

  useEffect(() => {
    setFocus(focusRef.current?._root?.focus?.());
  }, []);

  return (
    <div className={classes.mainDiv} name="firstDiv">
      {images.map((ele, index) => {
        return (
          <div key={index} className={classes.div}>
            <h2 className={classes.h2}>{genres[index].name}</h2> //some if block that shows modal only if focused
            {ele.map((imgLink, index) => {
              return (
                <img
                  className={classes.img}
                  src={imgLink}
                  key={index}
                  alt=""
                  ref={focusRef}
                  onClick={focus}
                  
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Movies;
