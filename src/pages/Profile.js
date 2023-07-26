import { json, useRouteLoaderData } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext, useState, useEffect } from "react";
import RightContent from "../components/RightContent";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/profileCustom.scss";

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

const ProfileDetailPage = () => {
  const ctx = useContext(AuthContext);
  const { profile, profilePosts } = useRouteLoaderData("profile");
  const [ownProfile, setOwnProfile] = useState(false);


  let profileBio;
  if (profile.bio.trim() === "") {
    profileBio = "Welp, looks like this user hasn't set a bio! (Yet!)";
  } else {
    profileBio = profile.bio;
  }

  useEffect(() => {
    if (profile._id === ctx.id) {
      setOwnProfile(true);
    } else {
      setOwnProfile(false);
    }
  }, [profile._id, ctx.id]);

  const data = { profile, profilePosts, profileBio, ownProfile };

  return <RightContent key={profile._id} method="profile-details" data={data} />;
};

export default ProfileDetailPage;

// Load in Profile information
export async function loader({ request, params }) {
  const id = params.profileId;

  console.log("loading profile information");

  const profileResult = await fetch(
    "http://localhost:5050/posts/profile/" + id
  );

  if (!profileResult.ok) {
    throw json({ message: "Could not fetch user." }, { status: 500 });
  }

  const profile = await profileResult.json();

  // Load in posts by specific user
  const profilePostsResult = await fetch(
    "http://localhost:5050/posts/profile/posts/" + id
  );

  if (!profilePostsResult.ok) {
    throw json({ message: "Could not fetch user's posts" }, { status: 500 });
  }

  const profilePosts = await profilePostsResult.json();

  for (let i in profilePosts) {
    let newDate = new Date(profilePosts[i].date);
    let formattedDate = `${newDate.getDate()}${" "}${
      months[newDate.getMonth()]
    }`;
    profilePosts[i].date = formattedDate;
  }

  return { profile, profilePosts };
}
