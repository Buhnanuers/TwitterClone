import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/formCustom.scss";

import { Form, NavLink } from "react-router-dom";

const SignUpForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((current) => !current);
  };

  return (
    <Form
      onSubmit={props.onSubmit}
      method="post"
      className="animateTop modalCard d-flex flex-column align-items-center border p-2"
    >
      <h2 className="modalHeader">Sign Up!</h2>
      <div className="w-100">
        <div className="justify-content-center">
          <div id="username">Username: </div>
          <input className="m-2 w-75" type="text" name="name" />
        </div>
      </div>
      <div className="w-100">
        <div className="justify-content-center">
          <div id="email">Email: </div>
          <input className="m-2 w-75" type="text" name="email" />
        </div>
      </div>
      <div className="w-100">
        <div className="justify-content-center">
          <div id="password">Password: </div>
          <input
            className="m-2 w-75"
            type={showPassword ? "text" : "password"}
            name="password"
          />
        </div>
      </div>
      <div className="w-100">
        <div className="justify-content-center">
          <div>
            <div id="password-confirm">Confirm Password: </div>
            <input
              className="m-2 w-75"
              type={showPassword ? "text" : "password"}
              name="password-confirm"
            />
          </div>

          <div className="d-flex justify-content-center align-items-center m-2">
            <small id="showPassword">Show Password</small>
            <input className="ms-2" type="checkbox" onClick={togglePassword} />
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary m-2">Sign Up!</button>
      </div>
      <div>
        <small>Have an Account? Click </small>
        <NavLink to="/auth?mode=login" className="signUpButton">
          <small> here </small>
        </NavLink>
        <small> to sign in!</small>
      </div>
    </Form>
  );
};

export default SignUpForm;
