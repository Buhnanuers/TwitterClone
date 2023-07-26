import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import { Link, Form, json } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

import Comment from "../Comment/Comment";

import heartClicked from "../../Assets/heart clicked.png";
import heartUnclicked from "../../Assets/heart unclicked.png";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/postDetailsCustom.scss";

const PostDetails = (props) => {
  const ctx = useContext(AuthContext);
  const [liked, setLiked] = useState(ctx.checkLikesForId(props.post.id));
  const [commentText, setCommentText] = useState("");
  const token = ctx.token;

  const addRemoveLikeHandler = async () => {
    let mode;
    if (liked) {
      setLiked(false);
      mode = "remove";
      ctx.removeLike(props.post._id);
    } else {
      setLiked(true);
      mode = "add";
      ctx.addLike(props.post._id);
    }

    // Request the change to the API
    if (mode !== "add" && mode !== "remove") {
      throw json({ message: "Unsupported mode." }, { status: 422 });
    }

    const data = { userId: ctx.id, postId: props.post._id };

    const response = await fetch("http://localhost:5050/posts/post/" + mode, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + ctx.token,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not Add/Remove like." }, { status: 500 });
    }
  };

  useEffect(() => {
    if (ctx.checkLikesForId(props.post._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [ctx.likes]);

  useEffect(() => {
    ctx.resetCurrentPost();
  }, [ctx]);

  const handleSubmitForm = (event) => {
    setCommentText("");
  };

  return (
    <div key={props.post._id} className="w-100 p-0 animateRight">
      <div className="postContainer m-2">
        <div className="postDetails ms-2">
          <Link to={`${"/profile/"}${props.post.author_id}`}>
            <h1 className="border-bottom border-dark">{props.post.author}</h1>
          </Link>

          <div className="postMessage p-3">{props.post.message}</div>
          <div className="d-flex flex-row align-items-end w-100 border-top border-dark postFooter">
            <h6 className="ms-3 w-25 text-secondary">{props.post.date}</h6>
            <div className="d-flex flex-row w-100 align-items-start">
              {token ? (
                <button onClick={addRemoveLikeHandler}>
                  <img
                    alt="likes"
                    src={liked ? heartClicked : heartUnclicked}
                  />
                </button>
              ) : (
                <div>
                  <img alt="likes" src={heartUnclicked} />
                </div>
              )}
              <h6 className="mt-1 text-secondary">{props.post.likes.length}</h6>
            </div>
          </div>
        </div>

        {token && (
          <Form onSubmit={handleSubmitForm} method="post">
            <div className="container mb-4">
              <div className="d-flex flex-column w-100 ms-2 border border-bottom-0 p-3 border-dark border-end-0 rounded-2">
                <h5 className="w-50 border-bottom border-dark pb-1">
                  {ctx.username}
                </h5>
                <textarea
                  className="form-control bg-transparent text-light border-0"
                  placeholder="Write a reply!"
                  wrap="hard"
                  maxLength="250"
                  name="comment"
                  onChange={(event) => setCommentText(event.target.value)}
                  value={commentText}
                />
                <button
                  type="submit"
                  className="btn btn-primary align-self-end"
                  style={{ width: "5rem" }}
                >
                  Reply
                </button>
              </div>
            </div>
          </Form>
        )}

        <ListGroup className="ms-4 border-start border-dark">
          {props.comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </ListGroup>
      </div>
    </div>
  );
};

export default PostDetails;
