import { Outlet } from "react-router-dom";

import CreatePost from "../components/CreatePost";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const PostsLayout = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
      {ctx.token && <CreatePost />}
      <Outlet />
    </>
  );
};

export default PostsLayout;