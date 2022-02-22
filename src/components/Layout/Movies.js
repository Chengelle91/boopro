import React, { useEffect, useState, useRef } from "react";
import genres from "./genres.json";
import Modal from "./Modal";
import classes from "./Movies.module.css";
import LoadingSpinner from "./LoadingSpinner";

const Movies = (props) => {
  const [images, setImages] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setIsLoading(true);
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

        setMovieData(results);
        setImages(images);
        setIsLoading(false);
      });
    };
    imgUrls();
  }, []);

  const focusRef = useRef();

  useEffect(() => {
    const firstImg = document.getElementById("00");
    if (firstImg) {
      firstImg.focus();
      setFocus(firstImg);
    }
  }, [images]);

  const onArrowKeyStroke = (event) => {
    event.preventDefault();
    const y = parseInt(event.target.getAttribute("y"));
    const x = parseInt(event.target.getAttribute("x"));

    let newElement;

    if (event.keyCode === 39) {
      newElement = document.getElementById(y.toString() + (x + 1));
    } else if (event.keyCode === 37) {
      newElement = document.getElementById(y.toString() + (x - 1));
    } else if (event.keyCode === 38) {
      newElement = document.getElementById(y - 1 + x.toString());
    } else if (event.keyCode === 40) {
      newElement = document.getElementById(y + 1 + x.toString());
    }

    if (!newElement) {
      return;
    } else {
      setFocus(newElement);
      newElement.focus();
      newElement.scrollIntoView();
    }
  };

  return (
    <div className={classes.mainDiv} name="firstDiv">
      {isLoading && <LoadingSpinner />}
      {images.map((ele, genreIndex) => {
        return (
          <div key={genres[genreIndex].name}>
            <h2 className={classes.h2}>{genres[genreIndex].name}</h2>
            <div key={genreIndex} className={classes.div}>
              {ele.map((imgLink, index) => {
                return (
                  <img
                    id={genreIndex.toString() + index}
                    x={index}
                    y={genreIndex}
                    className={classes.img}
                    src={imgLink}
                    key={index}
                    tabIndex="0"
                    alt=""
                    ref={focusRef}
                    onFocus={() => {
                      setModalData(movieData[genreIndex].results[index]);
                    }}
                    disabled={isLoading}
                    onKeyDown={onArrowKeyStroke}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <Modal
        openModal={() => setShowModal(true)}
        showModal={showModal}
        modalData={modalData}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
export default Movies;
