import genres from "./genres.json";
import { useState, useEffect } from "react";

const Modal = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgUrls = () => {
      const promises = genres.map((genre) => {
        return fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
        ).then((response) => response.json());
      });

      Promise.all(promises).then((results) => {
        const images = results.map((result) =>
          result.results.map((data) => data.title)
        );

        setImages(images);
      });
    };
    imgUrls();
  }, []);

  console.log(images);

  return (
    <div>
      <header></header>

      <footer></footer>
    </div>
  );
};

export default Modal;
