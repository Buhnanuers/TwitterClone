import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/formCustom.scss";

import { Form, NavLink } from "react-router-dom";

const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((current) => !current);
  };

  return (
    <Form
      onSubmit={props.onClose}
      method="post"
      className="animateTop modalCard d-flex flex-column align-items-center border p-2"
    >
      <h2 className="modalHeader">Log in!</h2>
      <div className="w-100">
        <div className="justify-content-center">
          <div id="email">Email: </div>
          <input className="m-2 w-75" type="text" name="email" />
        </div>
      </div>
      <div className="w-100">
        <div className="justify-content-center">
          <div>
            <div id="password">Password: </div>
            <input
              className="m-2 w-75"
              type={showPassword ? "text" : "password"}
              name="password"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center m-2">
            <small id="showPassword">Show Password</small>
            <input className="ms-2" type="checkbox" onClick={togglePassword} />
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary m-2">Log in!</button>
      </div>
      <div>
        <small>Need an Account? Click </small>
        <NavLink to="/auth?mode=signup" className="signUpButton">
          <small> here </small>
        </NavLink>
        <small> to sign up!</small>
      </div>
    </Form>
  );
};

export default LoginForm;
