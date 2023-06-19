import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/blogs/post/${postId}`
        );
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          fetchLoggedInUserId(postData); // Fetch and set the logged-in user's ID
        } else {
          console.error("Error fetching post:", response.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const fetchLoggedInUserId = async (postData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/auth/userid", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { userId } = await response.json();
        setLoggedInUserId(userId);
        setIsLiked(postData.likes.includes(userId)); // Check if the logged-in user has liked the post
      } else {
        console.error("Error fetching logged-in user ID:", response.status);
      }
    } catch (error) {
      console.error("Error fetching logged-in user ID:", error);
    }
  };

  const likePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/blogs/posts/like/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedPostData = await response.json();
        setPost((prevPost) => ({
          ...prevPost,
          likes: updatedPostData.likes, // Update only the likes field
        }));
        setIsLiked(!isLiked); // Toggle the isLiked state
      } else {
        console.error("Error liking post:", response.status);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleLike = async () => {
    await likePost(); // Call the likePost function to update the backend
  };

  const handleUpdatePost = () => {
    // Redirect to the update page with the postId as a parameter
    navigate(`/updatepost/${postId}`);
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/blogs/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Post deleted successfully, navigate to the home page
        navigate("/");
      } else {
        console.error("Error deleting post:", response.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) {
    return <p>Loading post details...</p>;
  }

  const isCurrentUserPost =
    post.createdBy && post.createdBy._id === loggedInUserId;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-4" />
      )}
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-600 mb-2">Tags: {post.tags.join(", ")}</p>
      <p className="text-gray-600 mb-4">Likes: {post.likes.length}</p>
      <p className="text-gray-600 mb-2">
        Created By: {post.createdBy ? post.createdBy.username : "Unknown"}
      </p>
      <p className="text-gray-600 mb-4">Created At: {post.createdAt}</p>

      <button
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${
          isLiked ? "bg-blue-600" : ""
        }`}
        onClick={handleLike}
      >
        {isLiked ? "Liked" : "Like"}
      </button>

      {isCurrentUserPost && (
        <div className="mt-4">
          <button
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded mr-2"
            onClick={handleUpdatePost}
          >
            Update Post
          </button>
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">Comments</h3>
      {post.comments.length > 0 ? (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment._id} className="text-gray-700">
              {comment.content} -{" "}
              {comment.userId ? comment.userId.username : "Unknown"}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No comments yet</p>
      )}
    </div>
  );
};

export default PostDetails;
