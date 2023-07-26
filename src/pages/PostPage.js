import { useContext, useEffect, useState, memo } from "react";
import { useLoaderData } from "react-router-dom";

import RightContent from "../components/RightContent";
import { json } from "react-router-dom";
import AuthContext from "../store/auth-context";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function PostDetailPage() {
  const [comments, setComments] = useState([]);
  const post = useLoaderData();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    ctx.setCurrentPost(post._id);
  }, [post._id, ctx]);

  useEffect(() => {
    async function getComments() {
      // Convert the array to a string representation
      if (post.comments && post.comments.length > 0) {
        const arrayString = JSON.stringify(post.comments);

        // Encode the array string to be used as a URL parameter
        const encodedArrayString = encodeURIComponent(arrayString);

        const response = await fetch(
          `http://localhost:5050/posts/comments?array=${encodedArrayString}`
        );

        if (!response.ok) {
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
  }, [post.comments]);

  const data = {
    post,
    comments,
  };

  return <RightContent key={[post.id]} method="post-details" data={data} />;
}

export default memo(PostDetailPage);

// Create Comment form, call to API
export const action =
  (appContext) =>
  async ({ request }) => {
    const data = await request.formData();

    let sendData = {
      author: appContext.username,
      author_id: appContext.id,
      message: data.get("comment"),
    };

    const token = appContext.token;
    const response = await fetch("http://localhost:5050/posts/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
      body: JSON.stringify(sendData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not send comment." }, { status: 500 });
    }

    const resData = await response.json();

    let commentId = resData.id;
    console.log("commentId: " + commentId);

    if (!commentId) {
      return;
    }
    console.log("currPost: " + appContext.getCurrentPost());

    // Add comment to post via API call
    const addComment = await fetch(
      "http://localhost:5050/posts/post/" + appContext.currPost,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + token,
        },
        body: JSON.stringify({ commentId }),
      }
    );
    console.log(addComment);

    if (addComment.status === 422 || addComment.status === 401) {
      return addComment;
    }

    if (!addComment.ok) {
      throw json(
        { message: "Could not add comment to post." },
        { status: 500 }
      );
    }

    return null;
  };

// Get ID of post from URL and send to main component
export async function loader({ request, params }) {
  const id = params.postId;

  const response = await fetch("http://localhost:5050/posts/post/" + id);
  if (!response.ok) {
    throw json({ message: "Failed to load post." }, { status: 500 });
  }

  const resData = await response.json();

  let currentDate = Date.parse(new Date());
  let test = Date.parse(resData.date);
  const diffTime = Math.abs(currentDate - test);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.round(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.round(diffTime / (1000 * 60));
  const diffSeconds = Math.round(diffTime / 1000);

  let formattedDate;
  if (diffDays >= 3) {
    let newDate = new Date(resData.date);
    formattedDate = `${newDate.getDate()}${" "}${months[newDate.getMonth()]}`;
    resData.date = formattedDate;

    return resData;
  } else {
    if (diffHours < 24) {
      if (diffMinutes < 60) {
        if (diffSeconds < 60) {
          formattedDate = `${diffSeconds}${"s"}`;
          resData.date = formattedDate;

          return resData;
        }
        formattedDate = `${diffMinutes}${"m"}`;
        resData.date = formattedDate;

        return resData;
      }
      formattedDate = `${diffHours}${"h"}`;
      resData.date = formattedDate;

      return resData;
    }
    formattedDate = `${diffDays}${"d"}`;
    resData.date = formattedDate;

    return resData;
  }
}
