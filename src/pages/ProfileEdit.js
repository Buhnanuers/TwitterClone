import { useRouteLoaderData } from "react-router-dom";
import RightContent from "../components/RightContent";

const EditProfilePage = () => {
  const { profile } = useRouteLoaderData("profile");

  let profileBio;
  if (profile.bio.trim() === "") {
    profileBio = "Welp, looks like this user hasn't set a bio! (Yet!)";
  } else {
    profileBio = profile.bio;
  }

  console.log("in ProfileEdit");

  const data = {
    method: "patch",
    profile,
    profileBio,
  };

  return <RightContent method="profile-form" data={data} />;
};

export default EditProfilePage;
