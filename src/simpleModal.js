import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "./App.css";
import moment from 'moment'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

function SimpleModal(props) {
  const { isOpen, handleClose } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const date = props.movieInfo ? moment(props.movieInfo.release_date).format('MM/DD/YY') : null
  const classes = useStyles();
  const movieInfo = props.movieInfo ? props.movieInfo.title : null
  const overview = props.movieInfo ? props.movieInfo.overview : null
  const path = props.movieInfo
    ? `http://image.tmdb.org/t/p/w185/${props.movieInfo.poster_path}`
    : null;

  return (
    isOpen ? (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <div style={modalStyle} className={classes.paper}>
        <img src={path} alt="Smiley face"  />
        {props.movie}
        <Typography variant="h4" id="modal-title">
          {movieInfo}
        </Typography>
        <Typography variant="subtitle1" id="sub-title">
          {date}
        </Typography>
        <h4>Overview</h4>
        <p className="overview">{overview}</p>
        <Button className='close-btn' onClick={handleClose}>Close</Button>
      </div>
    </Modal>
      ) : null
  );
}

export default SimpleModal;
