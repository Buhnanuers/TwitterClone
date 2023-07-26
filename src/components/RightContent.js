import { memo } from "react";
import PostDetails from "./Post/PostDetails";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileForm from "./Profile/ProfileForm";
import { redirect } from "react-router-dom";
import CommentDetails from "./Comment/CommentDetails";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/custom.scss";

const RightContent = (props) => {
  let data;
  let displayData;

  switch (props.method) {
    case "post-details":
      data = props.data;
      displayData = (
        <PostDetails key={data.post._id} post={data.post} comments={data.comments} />
      );
      break;

    case "comment-details":
      data = props.data;
      displayData = (
        <CommentDetails comment={data.comment} comments={data.comments} />
      );
      break;
      
    case "profile-details":
      data = props.data;
      displayData = (
        <ProfileDetails
          profile={data.profile}
          profilePosts={data.profilePosts}
          profileBio={data.profileBio}
          ownProfile={data.ownProfile}
        />
      );
      break;

    case "profile-form":
      data = props.data;
      displayData = (
        <ProfileForm
          method={data.method}
          profile={data.profile}
          profileBio={data.profileBio}
        />
      );
      break;
      
    default:
      displayData = redirect("..");
  }

  return <div classNames="animateInRight">{displayData}</div>;
};

export default memo(RightContent);
