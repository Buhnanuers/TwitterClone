import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { ListGroup } from "react-bootstrap";
import { Link, Form } from "react-router-dom";
import Comment from "./Comment";

const CommentDetails = (props) => {
  const ctx = useContext(AuthContext);
  const token = ctx.token;

  return (
    <div className=" w-100 p-0">
      <div className="postContainer m-2">
        <div className="postDetails ms-2">
          <Link to={`${"/profile/"}${props.comment.author_id}`}>
            <h1 className="border-bottom border-dark">{props.comment.author}</h1>
          </Link>

          <h4 className="postMessage p-3">{props.comment.message}</h4>
          <div className="d-flex flex-row align-items-end w-100 border-top border-dark postFooter">
            <h6 className="ms-3 text-secondary">{props.comment.date}</h6>
            <h6 className="ms-3 text-secondary">{`${
              props.comment.likes
            } ${"Likes"}`}</h6>
          </div>
        </div>

        {token && (
          <Form method="post">
            <div className="container mb-4">
              <div className="d-flex flex-column w-100 formFormat border border-bottom-0 p-3 border-end-0 rounded-2">
                <h5 className="w-50 border-bottom border-dark pb-1">
                  {ctx.username}
                </h5>
                <textarea
                  className="form-control bg-transparent  text-light border-0"
                  placeholder="Write a reply!"
                  wrap="hard"
                  maxLength="250"
                  name="comment"
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

        <ListGroup className="ms-4 border-start border-top-0 rounded-0 border-dark">
          {props.comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </ListGroup>
      </div>
    </div>
  );
};

export default CommentDetails;