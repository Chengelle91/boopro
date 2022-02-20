import React, { useEffect, useState, useRef } from "react";
import genres from "./genres.json";
import Modal from "./Modal";
import classes from "./Movies.module.css";

const Movies = (props) => {
  const [images, setImages] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

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

        setMovieData(results);
        setImages(images);
      });
    };
    imgUrls();
  }, []);

  const [focus, setFocus] = useState();
  const focusRef = useRef();

  useEffect(() => {
    const firstImg = document.getElementById("0");
    if (firstImg) {
      firstImg.focus();
    }
  }, [images]);

  return (
    <div className={classes.mainDiv} name="firstDiv">
      {images.map((ele, genreIndex) => {
        <h2 className={classes.h2}>{genres[genreIndex].name}</h2>;
        return (
          <div key={genres[genreIndex].name}>
            <div key={genreIndex} className={classes.div}>
              {ele.map((imgLink, index) => {
                return (
                  <img
                    id={genreIndex + index}
                    className={classes.img}
                    src={imgLink}
                    key={index}
                    tabIndex="0"
                    alt=""
                    ref={focusRef}
                    onFocus={function modal() {
                      setModalData(movieData[genreIndex].results[index]);
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
