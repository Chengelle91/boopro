import React, { useEffect } from "react";
import classes from "./Modal.module.css";
import VideoJS from "./VideoJS";
import Sample from "../video/Sample.mp4";
import { dblClick } from "@testing-library/user-event/dist/click";

const Modal = (props) => {
  const closeOnEscapeButton = (e) => {
    if (e.keyCode === 27) {
      props.onClose();
    }
  };

  const playerRef = React.useRef(null);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeButton);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeButton);
    };
  });
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
  });

  if (!props.showModal) {
    return null;
  }
  const doubleClickHandler = (e) => {
    if (e.which === dblClick) {
      this.requestFullscreen();
    }
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    height: "400",
    width: "800",
    sources: [
      {
        src: Sample,
        type: "video/mp4",
      },
    ],
    userActions: {
      doubleClick: doubleClickHandler,
      hotkeys: function (event) {
        if (event.which === 32) {
          event.preventDefault();
          this.pause();
        }
        if (event.which === 13) {
          this.play();
        }

        if (event.which === 27) {
          this.exitFullscreen();
        }
      },
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    //player events
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalcontent}>
        <h1 className={classes.modaltitle}>{props.modalData.title}</h1>
        <em>
          <div className={classes.modalbody}>{props.modalData.overview}</div>
        </em>

        <VideoJS
          options={videoJsOptions}
          onReady={handlePlayerReady}
          imgLink={props.modalData}
        >
          <video
            techCanOverridePoster={false}
            autoPlay={false}
            controls={true}
            height="200px"
            width="800px"
            poster="https://sm.ign.com/t/ign_za/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_ex7e.1080.jpg"
            liveui="true"
            preload="true"
          ></video>
        </VideoJS>
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
