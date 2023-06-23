import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

const MyPosts = () => {
  const { userId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const url = sortByLikes
        ? "https://techinfo.onrender.com/blogs/posts"
        : "https://techinfo.onrender.com/blogs/posts/bydate";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // Filter blogs based on the logged-in user
          const filteredBlogs = data.filter(
            (blog) => blog.createdBy._id === userId
          );
          setBlogs(filteredBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
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
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold">Welcome to TechInfo</h1>
          <nav className="mt-4 sm:mt-0">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleSort}
            >
              {sortByLikes ? "Sort by Date" : "Sort by Likes"}
            </button>
          </nav>
        </div>
        <div>
          {blogs.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">My Posts</h2>
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-3/4 sm:mr-6">
                      <Link to={`/post/${blog._id}`}>
                        <h3 className="text-xl font-bold hover:text-blue-500">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mt-2">
                        {getFirstTwoLines(blog.content)}
                      </p>
                      <div className="text-gray-400 mt-4 flex flex-col sm:flex-row justify-between">
                        <p>
                          By:{" "}
                          {blog.createdBy ? blog.createdBy.username : "Unknown"}
                        </p>
                        <p className="mt-2 sm:mt-0">
                          Posted On: {new Date(blog.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-gray-400 mt-2 flex flex-col sm:flex-row justify-between">
                        <p>Likes: {blog.likesCount}</p>
                        <p>Comments: {blog.comments.length}</p>
                      </div>
                    </div>
                    <div className="sm:w-1/4 h-auto flex justify-center items-center">
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
            <p className="text-lg text-gray-400 text-center">No blogs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
