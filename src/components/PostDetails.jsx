import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://techinfo.onrender.com/blogs/post/${postId}`
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
      const response = await fetch(
        "https://techinfo.onrender.com/auth/userid",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        `https://techinfo.onrender.com/blogs/posts/like/${postId}`,
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
        `https://techinfo.onrender.com/blogs/posts/${postId}`,
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

  const handleComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://techinfo.onrender.com/blogs/posts/comments/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentContent,
          }),
        }
      );

      if (response.ok) {
        const savedComment = await response.json();
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, savedComment], // Update the comments array with the new comment
        }));
        setCommentContent(""); // Clear the comment input field
      } else {
        console.error("Error creating comment:", response.status);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (!post) {
    return <p>Loading post details...</p>;
  }

  const isCurrentUserPost =
    post.createdBy && post.createdBy._id === loggedInUserId;

  // Format the createdAt date
  const formattedCreatedAt = new Date(post.createdAt).toLocaleString();

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg">
      <h2 className="text-4xl font-bold mb-8">{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-8 rounded-lg" />
      )}
      <p className="text-gray-400 text-lg leading-loose mb-8">{post.content}</p>
      <p className="text-gray-400 text-sm mb-4">Tags: {post.tags.join(", ")}</p>
      <p className="text-gray-400 text-sm mb-8">Likes: {post.likes.length}</p>
      <p className="text-gray-400 text-sm mb-4">
        Created By:{" "}
        {post.createdBy ? (
          <Link to={`/profile/${post.createdBy._id}`} className="text-blue-500">
            {post.createdBy.username}
          </Link>
        ) : (
          "Unknown"
        )}
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Created At: {formattedCreatedAt}
      </p>

      <button
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${
          isLiked ? "bg-blue-600" : ""
        }`}
        onClick={handleLike}
      >
        {isLiked ? "Liked" : "Like"}
      </button>

      {isCurrentUserPost && (
        <div className="mt-8 space-x-2">
          <button
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
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

      <h3 className="text-2xl font-semibold mt-12 mb-4">Comments</h3>
      <div className="mb-8">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="bg-gray-700 text-white rounded-lg p-4 w-full mb-4"
        ></textarea>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
          onClick={handleComment}
        >
          Post Comment
        </button>
      </div>

      {post.comments.length > 0 ? (
        <ul className="space-y-4">
          {post.comments.map((comment) => (
            <li
              key={comment._id}
              className="text-gray-400 flex items-start space-x-4"
            >
              <div className="w-6/7">
                <p className="p-2 bg-gray-700 rounded-lg">{comment.content}</p>
              </div>
              <div className="w-1/7">
                <p className="text-gray-400 mt-1">
                  Commented By:{" "}
                  {comment.userId ? (
                    <Link
                      to={`/profile/${comment.userId._id}`}
                      className="text-blue-500"
                    >
                      {comment.userId.username}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No comments yet</p>
      )}
    </div>
  );
};

export default PostDetails;
