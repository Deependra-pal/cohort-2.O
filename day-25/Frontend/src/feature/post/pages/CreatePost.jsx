import React, { useSyncExternalStore } from "react";
import "../style/createPost.scss";
import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const postImageInputFeildRef = useRef(null);

  const { loading, handleCreatePost } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = postImageInputFeildRef.current.files[0];

    await handleCreatePost(file, caption);

    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>create-post</h1>
        <form onSubmit={handleSubmit}>
          <label className="image-label" htmlFor="postImage">
            Select Image
          </label>

          <input
            ref={postImageInputFeildRef}
            hidden
            type="file"
            name="post-image"
            id="postImage"
          />

          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="capiton"
            placeholder="Enter caption"
          />

          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
