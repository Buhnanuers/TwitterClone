import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "../scss/navbarCustom.scss";
import AuthContext from "../store/auth-context";

const Navbar = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <div className="col-md-3 w-100 navbarFont d-flex flex-column">
      <NavLink className="homeButton mb-2" to="/" end>
        Home
      </NavLink>
      {props.show && (
        <NavLink className="profileButton mb-2" to={`${"/profile/"}${ctx.id}`}>
          Profile
        </NavLink>
      )}
      {!props.show && (
        <NavLink className="btn btn-primary authButton" to="/auth?mode=login">
          Sign In/Up!
        </NavLink>
      )}
      {props.show && (
        <button
          className="btn btn-primary authButton"
          onClick={props.updateAuth}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
