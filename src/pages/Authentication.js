import { json, redirect } from "react-router-dom";
import Modal from "../components/UI/Modal";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../scss/modalCustom.scss";

function AuthenticationPage() {
  const [showModal, setShowModal] = useState(true);

  const handleOnSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="animateTop">
      {showModal && <Modal onClose={handleOnSubmit} />}
    </div>
  );
}

export default AuthenticationPage;

// Authenticate the user, based on whether or not they're logging in or signing up
// for the first time
export const action =
  (appContext) =>
  async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "signup") {
      throw json({ message: "Unsupported mode." }, { status: 422 });
    }

    const data = await request.formData();

    let authData;
    if (mode === "login") {
      authData = {
        email: data.get("email"),
        password: data.get("password"),
      };
    } else if (mode === "signup") {
      authData = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        passwordConfirm: data.get("password-confirm"),
      };
    }

    const response = await fetch("http://localhost:5050/auth/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem("token", token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    console.log(resData);

    appContext.onLogin(
      token,
      resData.username,
      resData.id,
      resData.bio,
      resData.followers,
      resData.following,
      resData.likes
    );

    return redirect("/");
  };
