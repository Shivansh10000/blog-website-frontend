import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

const SavedPosts = () => {
  const { userId } = useParams();
  const [savedPosts, setSavedPosts] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const url = sortByLikes
        ? "http://localhost:3001/blogs/posts"
        : "http://localhost:3001/blogs/posts/bydate";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // Filter blogs based on the user ID in the likes array
          const filteredPosts = data.filter((blog) =>
            blog.likes.includes(userId)
          );
          setSavedPosts(filteredPosts);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };
    fetchSavedPosts();
  }, [sortByLikes, userId]);

  const toggleSort = () => {
    setSortByLikes((prevState) => !prevState);
  };

  const getFirstTwoLines = (content) => {
    const lines = content.split("\n");
    if (lines.length > 2) {
      return lines.slice(0, 2).join("\n");
    }
    return content;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Saved Posts</h1>
          <nav>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleSort}
            >
              {sortByLikes ? "Sort by Date" : "Sort by Likes"}
            </button>
          </nav>
        </div>
        <div>
          {savedPosts.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Saved Posts</h2>
              {savedPosts.map((blog) => (
                <div
                  key={blog._id}
                  className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="flex">
                    <div className="w-3/4 mr-6">
                      <Link to={`/post/${blog._id}`}>
                        <h3 className="text-xl font-bold hover:text-blue-500">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mt-2">
                        {getFirstTwoLines(blog.content)}
                      </p>
                      <div className="text-gray-400 mt-4 flex justify-between">
                        <p>
                          By:{" "}
                          {blog.createdBy ? blog.createdBy.username : "Unknown"}
                        </p>
                        <p>
                          Posted On: {new Date(blog.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-gray-400 mt-2 flex justify-between">
                        <p>Likes: {blog.likesCount}</p>
                        <p>Comments: {blog.comments.length}</p>
                      </div>
                    </div>
                    <div className="w-1/4 h-auto flex justify-center items-center">
                      <img
                        src={blog.imageUrl}
                        alt="Blog"
                        className="h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-400 text-center">
              No saved posts found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
