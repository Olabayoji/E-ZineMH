import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
type Props = {
  children: any;
};

type BackdropProp = {
  onClose: () => void;
};

const Backdrop = (props: BackdropProp) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = (props: Props) => {
  return <>{props.children}</>;
};

type ModalProp = {
  onClose: () => void;
  children: any;
  show: boolean;
};
const portalDiv = document.getElementById("overlays");

export default function Modal(props: ModalProp) {
  return (
    <Fragment>
      {props.show
        ? ReactDOM.createPortal(
            <Backdrop onClose={props.onClose} />,
            portalDiv!
          )
        : null}
      {/* {props.show */}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalDiv!
      )}
      {/* : null} */}
    </Fragment>
  );
}
