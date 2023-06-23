import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://techinfo.onrender.com/blogs/post/${postId}`
        );
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setTags(postData.tags.join(", "));
          setImageUrl(postData.imageUrl);
        } else {
          console.error("Error fetching post:", response.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://techinfo.onrender.com/blogs/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            imageUrl,
          }),
        }
      );

      if (response.ok) {
        // Post updated successfully
        console.log("Post updated!");
      } else {
        console.error("Error updating post:", response.status);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!post) {
    return <p>Loading post details...</p>;
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <label className="block mb-2 text-gray-700">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500"
      />
      <label className="block mb-2 text-gray-700">Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full h-40 focus:outline-none focus:ring focus:border-blue-500"
      />
      <label className="block mb-2 text-gray-700">Tags:</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500"
      />
      <label className="block mb-2 text-gray-700">Image URL:</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={handleUpdatePost}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
      >
        Update Post
      </button>
    </div>
  );
};

export default UpdatePost;
