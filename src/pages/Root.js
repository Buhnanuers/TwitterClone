import NavBar from "../components/Navbar";

import {
  Outlet,
  useLoaderData,
  json,
  redirect,
  useSubmit,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/custom.scss";
import PostList from "../components/Post/PostList";
import CreatePost from "../components/Post/CreatePost";

import AuthContext from "../store/auth-context";
import { useContext, memo, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/rightCustom.scss";
import HomePage from "./HomePage";

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

function RootLayout() {
  const [show, setShow] = useState(false);
  const ctx = useContext(AuthContext);
  const posts = useLoaderData();
  const token = ctx.token;
  const submit = useSubmit();

  useEffect(() => {
    if (token) {
      setShow(true);
    }
  }, [token]);

  const updateAuth = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      submit(null, {
        method: "post",
        action: "/logout",
      });
      ctx.updateToken("");
      setShow(ctx.checkAuth());
    }
  };
  
  return (
    <div className="container w-100">
      <div className="row gx-3 d-flex justify-content-center">
        <div className="d-flex flex-column col-md-3 p-3 animateLeft">
          <div className="align-self-end">
            <HomePage />
          </div>
          <div className="align-self-end me-4 animateLeftDelayed">
            <NavBar show={show} updateAuth={updateAuth} />
          </div>
        </div>
        <div className="col-md-3 animateTop">
          {show && <CreatePost />}
          <PostList token={token} posts={posts} />
        </div>
        <div className="col-md-3 animateInRight">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default memo(RootLayout);

// Load in post list
export async function loader() {
  const response = await fetch("http://localhost:5050/posts/");
  console.log("Loading all posts");

  if (!response.ok) {
    throw json({ message: "Could not fetch posts" }, { status: 500 });
  } else {
    const resData = await response.json();

    for (let i in resData) {
      let newDate = new Date(resData[i].date);
      let formattedDate = `${newDate.getDate()}${" "}${
        months[newDate.getMonth()]
      }`;
      resData[i].date = formattedDate;
    }
    return resData;
  }
}

// Create Post form, call to API
export const action =
  (appContext) =>
  async ({ request }) => {
    const data = await request.formData();

    let sendData = {
      author: appContext.username,
      author_id: appContext.id,
      message: data.get("message"),
    };

    const token = appContext.token;
    const response = await fetch("http://localhost:5050/posts/", {
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
      throw json({ message: "Could not send post." }, { status: 500 });
    }

    return redirect("/");
  };
