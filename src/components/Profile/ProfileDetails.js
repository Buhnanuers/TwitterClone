import { useContext, useEffect, useState } from "react";
import { Link, json, redirect, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { ListGroup } from "react-bootstrap";
import Post from "../Post/Post";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/profileCustom.scss";

const ProfileDetails = (props) => {
  const ctx = useContext(AuthContext);
  const { profileId } = useParams();

  const profile = props.profile;
  const profileBio = props.profileBio;
  const profilePosts = props.profilePosts;
  const ownProfile = props.ownProfile;
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(ctx.checkFollowers(profile._id));
  }, [profile, ctx]);

  const followButtonHandler = async () => {
    const ownId = ctx.id;
    const otherId = profile._id;

    if (!ownId || !otherId || !ctx.token) {
      return redirect(".");
    }

    const data = { ownId: ownId, otherId: otherId };

    const followResult = await fetch(
      `http://localhost:5050/posts/profile/${ownId}/follow`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + ctx.token,
        },
        body: JSON.stringify(data),
      }
    );

    if (followResult.followersResult === 422) {
      return followResult.followersResult;
    }

    if (followResult.followingResult === 422) {
      return followResult.followingResult;
    }

    if (!followResult.ok) {
      throw json(
        { message: "Could not edit followers/following." },
        { status: 500 }
      );
    }

    ctx.updateFollowing("add", otherId);
    setIsFollowing(true);

    return null;
  };

  const unfollowButtonHandler = async () => {
    const ownId = ctx.id;
    const otherId = profile._id;

    if (!ownId || !otherId || !ctx.token) {
      return redirect(".");
    }

    const data = { ownId: ownId, otherId: otherId };

    const unfollowResult = await fetch(
      `http://localhost:5050/posts/profile/${ownId}/unfollow`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + ctx.token,
        },
        body: JSON.stringify(data),
      }
    );

    if (unfollowResult.unfollowersResult === 422) {
      return unfollowResult.unfollowersResult;
    }

    if (unfollowResult.unfollowingResult === 422) {
      return unfollowResult.unfollowingResult;
    }

    if (!unfollowResult.ok) {
      throw json(
        { message: "Could not edit followers/following." },
        { status: 500 }
      );
    }

    setIsFollowing(false);

    return null;
  };

  return (
    <div key={profile._id} className="m-3 text-white w-100 animateRight">
      <div className="d-flex align-items-center mh-100">
        <div className="w-100 d-flex flex-column mb-2">
          <div className="d-flex">
            <h1 className="w-100">{profile.username}</h1>
            {ownProfile ? (
              <Link
                to={`/profile/${profileId}/edit`}
                className="btn btn-secondary ms-5 mt-2"
              >
                Edit
              </Link>
            ) : (
              ctx.token && (
                <div className="ms-5 mt-2 ml-auto">
                  {isFollowing ? (
                    <button
                      onClick={unfollowButtonHandler}
                      className="btn btn-warning"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={followButtonHandler}
                      className="btn btn-primary"
                    >
                      Follow
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          <div className="border-start border-bottom border-dark mb-2 rounded-1">
            <div className="bioClass">
              <div className="ms-3 mt-2 text-light">
                <h6
                  className={
                    profile.bio.trim() === "" ? "text-secondary" : "text-white"
                  }
                >
                  {profileBio}
                </h6>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center text-secondary">
            <h6 className="ms-4">{`${
              profile.followers.length
            } ${"Followers"}`}</h6>
            <h6 className="ms-4">{`${
              profile.following.length
            } ${"Following"}`}</h6>
          </div>

          <ListGroup className="border border-dark w-100 rounded-1">
            {profilePosts.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.author}
                  date={post.date}
                  message={post.message}
                  likeCount={post.likes}
                  commentList={post.comments}
                />
              );
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
