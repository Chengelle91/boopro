import { useEffect } from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const closeOnEscapeButton = (e) => {
    if (e.keyCode === 27) {
      props.onClose();
    }
  };
  

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeButton);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeButton);
    };
  }, );
  const openOnEnterButton = (e) => {
    if (e.keyCode === 13) {
      props.openModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", openOnEnterButton);
    return function cleanup() {
      document.body.removeEventListener("keydown", openOnEnterButton);
    };
  }, );

  if (!props.showModal) {
    return null;
  }
  return (
    <div className={classes.modal}>
      <div className={classes.modalcontent}>
        <h1 className={classes.modaltitle}>{props.modalData.title}</h1>
        <em>
          <div className={classes.modalbody}>{props.modalData.overview}</div>
        </em>
        <div
          className={classes.modaldate}
        >{`Release Date: ${props.modalData.release_date}`}</div>
        <div className={classes.modalfooter}>
          {`TMDB Rating: ${props.modalData.vote_average}★`}
        </div>
      </div>
    </div>
  );
};

export default Modal;
