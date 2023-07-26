import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Post from "./Post";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/postListCustom.scss";

export default function PostList(props) {
  const [postListClassName, setPostListClassName] = useState("");

  useEffect(() => {
    if (props.token) {
      setPostListClassName(
        "border border-secondary border-top-0 border-bottom-0 postListSignedIn"
      );
    } else {
      setPostListClassName(
        "border border-secondary border-top-0 border-bottom-0 postListSignedOut"
      );
    }
  }, [props.token]);

  return (
    <div key={props.token} className={postListClassName}>
      <ListGroup className=" w-100 rounded-0">
        {props.posts.map((post) => {
          return (
            <Post
              key={post._id}
              id={post._id}
              author={post.author}
              date={post.date}
              message={post.message}
              likes={post.likes}
              commentList={post.comments}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}
