import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://techinfo.onrender.com/blogs/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags, imageUrl }),
      });

      if (response.ok) {
        setSuccessMessage("Post successfully created!");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Create post error:", error);
      setError("An error occurred while creating the post.");
      setSuccessMessage("");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Create a Post</h1>
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="text-lg font-bold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="border border-gray-300 rounded-md p-2 w-full bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="text-lg font-bold">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="border border-gray-300 rounded-md p-2 w-full bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="text-lg font-bold">
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              className="border border-gray-300 rounded-md p-2 w-full bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="text-lg font-bold">
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange}
              className="border border-gray-300 rounded-md p-2 w-full bg-gray-800 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Post
          </button>
        </form>
        <button
          onClick={handleGoHome}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
