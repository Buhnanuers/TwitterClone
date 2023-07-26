import "bootstrap/dist/css/bootstrap.css";
import "../../scss/postCustom.scss";

import { NavLink } from "react-router-dom";
import replyImage from "../../Assets/reply.png";
import notLikedImage from "../../Assets/heart unclicked.png";
import likedImage from "../../Assets/heart clicked.png";
import { memo, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

const Post = (props) => {
  const ctx = useContext(AuthContext);
  const [liked, setLiked] = useState(ctx.checkLikesForId(props.id));

  useEffect(() => {
    if (ctx.checkLikesForId(props.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [props]);

  const updateLikes = (method) => {
    if (method === "add") {
      setLiked(true);
    }
    if (method === "remove") {
      setLiked(false);
    }
  };

  let link;
  if (ctx.getCurrentPost() !== props.id) {
    link = (
      <NavLink
        to={`${"/post/"}${props.id}`}
        className="postButton d-flex flex-column w-100 p-2 m-0"
        onClick={updateLikes}
      >
        <div className="d-flex align-items-center">
          <div className="author m-0 pb-2">{props.author}</div>
          <div className="bg-transparent date pb-0 pt-0">{props.date}</div>
        </div>
        <div className="ms-3 message">
          <div>{props.message}</div>
        </div>
        <div className="d-flex w-100 ms-3 mb-2 pt-2 border-top border-dark justify-content-start">
          <div className="bg-transparent">
            <div className="w-100 bg-transparent details p-0">
              {props && (
                <div className="d-flex align-items-center">
                  <img className="me-2" alt={"reply"} src={replyImage} />
                  <div>{props.commentList.length}</div>
                </div>
              )}
            </div>
          </div>
          <div className="ms-4 bg-transparent align-self-end">
            <div className="bg-transparent badgeFont p-0">
              <div className="d-flex align-items-center">
                <img
                  className="me-2"
                  alt={"like"}
                  src={liked ? likedImage : notLikedImage}
                />
                <div>{props.likes.length}</div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    );
  } else {
    link = (
      <div className="d-flex flex-column activePost w-100 p-2 m-0">
        <div className="d-flex align-items-center">
          <div className="activeAuthor m-0 pb-2">{props.author}</div>
          <div className="bg-transparent date pb-0 pt-0">{props.date}</div>
        </div>
        <div className="ms-3 message">
          <div>{props.message}</div>
        </div>
        <div className="d-flex w-100 ms-3 mb-2 pt-2 border-top border-dark align-items-top">
          <div className="bg-transparent">
            <div className="w-100 bg-transparent details p-0">
              {props && (
                <div className="d-flex align-items-center">
                  <img className="me-2" alt={"reply"} src={replyImage} />
                  <div>{props.commentList.length}</div>
                </div>
              )}
            </div>
          </div>
          <div className="ms-4 bg-transparent">
            <div className="bg-transparent details p-0">
              <div className="d-flex">
                <img
                  className="me-2"
                  alt={"like"}
                  src={liked ? likedImage : notLikedImage}
                />
                <div>{props.likes.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 recordFont border-bottom border-dark animateFadeIn">
      {link}
    </div>
  );
};

export default memo(Post);
