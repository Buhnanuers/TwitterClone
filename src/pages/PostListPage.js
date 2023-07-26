import { useContext } from "react";
import PostList from "../components/PostList";
import AuthContext from "../store/auth-context";
import { Outlet, json, redirect, useRouteLoaderData } from "react-router-dom";
import CreatePost from "../components/CreatePost";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/rightCustom.scss";

const PostListPage = () => {
  const ctx = useContext(AuthContext);
  const posts = useRouteLoaderData("root");
  const token = ctx.token;

  console.log(posts);

  return (
    <div className="rightMain">
      <div>
        {token && <CreatePost />}
        <PostList token={token} posts={posts} />;
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PostListPage;

// Create Post form, call to API
export const action =
  (appContext) =>
  async ({ request }) => {
    const data = await request.formData();
    console.log("post test!");

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
