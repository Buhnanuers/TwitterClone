// Import React
import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "./scss/custom.scss";

// Import context
import AuthContext from "./store/auth-context";

// Import pages
import RootLayout, {
  loader as postsLoader,
  action as postAction,
} from "./pages/Root";
import { action as logoutAction } from "./pages/Logout";
import PostDetailPage, {
  action as commentAction,
  loader as postLoader,
} from "./pages/PostPage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import ProfileDetailPage, { loader as profileLoader } from "./pages/Profile";
import EditProfilePage from "./pages/ProfileEdit";
import { action as profileEditAction } from "./components/Profile/ProfileForm";
import CommentPage, { loader as commentLoader } from "./pages/CommentPage";

/*
  TO-DO-LATER:

    Front-End:
      1) Add profile pics & profile banners
      2) Add image and video embedding into posts
      3) Add search bar

    Back-End:
      1) Implement file uploading for profile pics, profile banners, image, and video embedding
      2) Implement search bar functionality
      3) Implement filtering post list by user following list
*/

const App = () => {
  const appContext = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: postsLoader,
      action: postAction(appContext),
      children: [
        {
          path: "auth",
          element: <AuthenticationPage />,
          action: authAction(appContext),
        },
        {
          path: "post/:postId",
          loader: postLoader,
          action: commentAction(appContext),
          element: <PostDetailPage />,
        },
        {
          path: "comment/:commentId",
          loader: commentLoader,
          action: commentAction(appContext),
          element: <CommentPage />,
        },
        {
          path: "profile",
          id: "profile",
          loader: profileLoader,
          children: [
            {
              path: ":profileId",
              element: <ProfileDetailPage />,
            },
            {
              path: ":profileId/edit",
              element: <EditProfilePage />,
              action: profileEditAction(appContext),
            },
          ],
        },
        {
          path: "comment",
          children: [
            {
              path: ":commentId",
            },
          ],
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return (
    <div className="p-3 pt-0 w-100 screenFiller row">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
