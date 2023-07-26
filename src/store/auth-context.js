import React, { useState } from "react";
import { redirect } from "react-router-dom";

const AuthContext = React.createContext({
  token: null,
  username: null,
  id: null,
  bio: null,
  followers: [],
  following: [],
  currPost: null,
  likes: [],
  getAll: () => {},
  onLogout: () => {},
  onLogin: (token, username, id, bio, followers, following, likes) => {},
  checkLikesForId: (id) => {},
  addLike: (id) => {},
  removeLike: (id) => {},
  getLikes: () => {},
  setCurrentPost: (id) => {},
  resetCurrentPost: () => {},
  updateToken: (token) => {},
  updateUserName: (username) => {},
  updateBio: (bio) => {},
  updateId: (id) => {},
  updateFollowers: (method, id) => {},
  updateFollowing: (method, id) => {},
  getCurrentPost: () => {},
  getTokenDuration: () => {},
  checkFollowers: (id) => {},
  checkAuth: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [id, setId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currPost, setCurrPost] = useState("");

  const setCredentialsHandler = (
    token,
    username,
    id,
    bio,
    followers,
    following,
    likes
  ) => {
    setToken(token);
    setUsername(username);
    setBio(bio);
    setId(id);
    setFollowers(followers);
    setFollowing(following);
    setLikes(likes);
  };

  const getAll = () => {
    const profile = {
      token,
      username,
      id,
      bio,
      followers,
      following,
      likes,
    };

    return profile;
  };

  const checkLikesForId = (id) => {
    if (!likes) {
      return false;
    }

    if (likes.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const addLike = (id) => {
    if (!likes) {
      setLikes(id);
    } else if (likes.length === 0) {
      setLikes(id);
    } else {
      const newList = [...likes, id];
      setLikes(newList);
    }

    console.log(likes);
  };

  const removeLike = (id) => {
    console.log(likes);
    if (!likes) {
      return;
    }
    if (likes.length > 0) {
      setLikes((current) => {
        current.filter((element) => {
          return element !== id;
        });
      });
    }
  };

  const getLikes = () => {
    return likes;
  };

  const updateToken = (token) => {
    setToken(token);
  };

  const updateUsername = (username) => {
    setUsername(username);
  };

  const updateBio = (bio) => {
    setBio(bio);
  };

  const updateId = (id) => {
    setId(id);
  };

  const updateFollowers = (method, id) => {
    if (method === "add") {
      const newList = [...followers, id];
      setFollowers(newList);
    }
    if (method === "remove") {
      setFollowers((current) => current.filter((element) => element !== id));
    }
  };

  const updateFollowing = (method, id) => {
    if (method === "add") {
      const newList = [...following, id];
      setFollowing(newList);
    }
    if (method === "remove") {
      setFollowing((current) => current.filter((element) => element !== id));
    }
  };

  const setCurrentPost = (id) => {
    setCurrPost(id);
  };

  const getCurrentPost = () => {
    return currPost;
  };

  const resetCurrentPost = () => {
    setCurrPost("");
  };

  const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  };

  const checkFollowers = (id) => {
    if (!following) {
      return false;
    }

    return following.includes(id);
  };

  const checkAuth = () => {
    const browserToken = localStorage.getItem("token");

    if (!browserToken) {
      return null;
    }

    if (!token) {
      return redirect("/auth");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        id,
        bio,
        followers,
        following,
        currPost,
        getAll,
        onLogin: setCredentialsHandler,
        checkLikesForId,
        addLike,
        removeLike,
        getLikes,
        setCurrentPost,
        getCurrentPost,
        resetCurrentPost,
        updateUsername,
        updateBio,
        updateId,
        updateFollowers,
        updateFollowing,
        updateToken,
        getTokenDuration,
        checkFollowers,
        checkAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
