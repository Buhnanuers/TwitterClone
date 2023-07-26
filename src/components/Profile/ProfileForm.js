import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";

const ProfileForm = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const method = props.method;

  const profile = props.profile;
  const profileBio = props.profileBio;

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate(-1);
  }

  return (
    <div className="m-3 text-white w-100">
      <div className="d-flex align-items-center mh-100">
        <Form method={method}>
          <div className="mb-2 d-flex align-items center">
            <input
              placeholder={profile.username}
              className="w-100 usernameEdit"
              type="text"
              name="username"
              autoFocus
              maxLength="25"
            ></input>
            <button
              type="submit"
              className="btn btn-success ms-5 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>

          <div className="border-start border-bottom border-dark mb-2 rounded-1 ">
            <div className="bioClass">
              <textarea
                placeholder={profileBio}
                className="w-75 bioEdit"
                type="text"
                name="bio"
                maxLength="100"
              ></textarea>
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
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;

export const action =
  (appContext) =>
  async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();

    const profileData = {
      userName: data.get("username"),
      bio: data.get("bio"),
    };

    if(profileData.userName === "") {
      profileData.userName = appContext.username;
    }

    if(profileData.bio === "" ) {
      profileData.userName = appContext.bio;
    }

    let url = "http://localhost:5050/posts/profile";

    if (method === "PATCH") {
      const profileId = params.profileId;
      url = "http://localhost:5050/posts/profile/" + profileId;
    }

    const token = appContext.token;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
      body: JSON.stringify(profileData),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json(
        { message: "Could not save profile changes." },
        { status: 500 }
      );
    }

    return redirect("/");
  };
