import React from "react";
import { Badge } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/commentCustom.scss";
import { NavLink } from "react-router-dom";

const Comment = (props) => {
  return (
    <div className="container ml-2 mb-1 pt-0 p-2 ps-0">
      <NavLink
        to={`${"/comment/"}${props.comment._id}`}
        className="w-100 ml-2 p-2 commentButton"
      >
        <div className="d-flex flex-column align-items-start ms-3">
          <h5 className="border-bottom border-dark p-2 pb-0 mb-1">
            {props.comment.author}
          </h5>
          <h6 className="text-center pl-2">{props.comment.message}</h6>
        </div>
      </NavLink>
      <div className="d-flex flex-row justify-content-start align-items-center ms-3">
        <Badge
          pill
          variant="primary"
          className="bg-transparent badgeFont mr-auto"
        >{`${props.comment.comments.length} ${"Comments"}`}</Badge>
        <button className="btn bg-transparent commentButton">
          <Badge pill variant="primary" className="bg-transparent badgeFont">
            {`${props.comment.likes} ${"Likes"}`}
          </Badge>
        </button>
      </div>
    </div>
  );
};

export default Comment;
