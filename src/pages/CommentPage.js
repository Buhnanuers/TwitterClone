import { useEffect, useState, memo } from "react";
import { useLoaderData } from "react-router-dom";

import RightContent from "../components/RightContent";
import { json } from "react-router-dom";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const comment = useLoaderData();


  useEffect(() => {
    async function getComments() {
      // Convert the array to a string representation
      if (comment.comments && comment.comments.length > 0) {
        const arrayString = JSON.stringify(comment.comments);

        // Encode the array string to be used as a URL parameter
        const encodedArrayString = encodeURIComponent(arrayString);

        const response = await fetch(
          `http://localhost:5050/posts/comments?array=${encodedArrayString}`
        );

        if(!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const comments = await response.json();

        setComments(comments);
      } else {
        setComments([]);
      }
    }

    getComments();

    return;
  }, [comment.comments]);

  const data = {
    comment,
    comments,
  }

  return <RightContent key={comment.id} method="comment-details" data={data} />;
};

export default memo(CommentPage);

// Get comment by id
export async function loader({ request, params }) {
  const id = params.commentId;

  console.log("getting comment");

  const response = await fetch("http://localhost:5050/posts/comment/" + id);
  if (!response.ok) {
    throw json({ message: "Failed to load comment." }, { status: 500 });
  }

  const resData = await response.json();

  return resData;
}
