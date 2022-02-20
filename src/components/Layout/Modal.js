import classes from "./Modal.module.css";

const Modal = (props) => {
  console.log(props);
  if (!props.showModal) {
    return null;
  }

  return (
    <div className={classes.modal}>
      <div className={classes.modalcontent}>
        <h1 className={classes.modaltitle}>{props.objKey.title}</h1>
        <div className={classes.modalbody}>{props.objKey.overview}</div>
        <div className={classes.modaltitle}>{props.objKey.tagline}</div>
        <div className={classes.modalfooter}>{props.objKey.vote_average}</div>
      </div>
    </div>
  );
};

export default Modal;
