import { Fragment } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/modalCustom.scss";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import { NavLink, useSearchParams } from "react-router-dom";

const Backdrop = () => {
  return <NavLink className="modalBackdrop" to="/" />;
};

const ModalOverlay = (props) => {
  const [searchParams] = useSearchParams();

  if (searchParams.get("mode") === "login") {
    return <LoginForm onClose={props.onClose} />;
  } else if (searchParams.get("mode") === "signup") {
    return <SignUpForm onClose={props.onClose} />;
  }
};

const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const wrapperId = "react-portal-wrapper";
const portalElement = createWrapperAndAppendToBody(wrapperId);

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          className="animateTop"
          mode={props.mode}
          onClose={props.onClose}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
