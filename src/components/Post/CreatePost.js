import React, { useContext, useState } from "react";
import { Form } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const CreatePost = () => {
  const [text, setText] = useState("");
  const ctx = useContext(AuthContext);

  const handleSubmitForm = (event) => {
    setText("");
  };

  // This following section will display the form that takes the input from the user.
  return (
    <Form
      method="post"
      className="d-flex flex-column p-2 border border-top-0 border-secondary border-bottom"
      onSubmit={handleSubmitForm}
    >
      <h3 className="text-white">{ctx.username}</h3>
      <div className="input-group w-100 pb-2">
        <input
          type="textarea"
          className="form-control bg-transparent w-100 border-0 text-light"
          placeholder="What's going on?"
          name="message"
          aria-label="Post"
          aria-describedby="basic-addon1"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary align-self-end"
        style={{ width: "5rem" }}
      >
        Post!
      </button>
    </Form>
  );
};

export default CreatePost;
