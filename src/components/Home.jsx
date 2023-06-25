import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const url = sortByLikes
        ? "https://techinfo.onrender.com/blogs/posts"
        : "https://techinfo.onrender.com/blogs/posts/bydate";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [sortByLikes]);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleSort = () => {
    setSortByLikes((prevState) => !prevState);
  };

  const getFirstLine = (content) => {
    const lines = content.split("\n");
    if (lines.length > 0) {
      return lines[0];
    }
    return "";
  };

  const formatPostDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full h-full p-4">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold text-center sm:text-left mb-4 sm:mb-0">
            Welcome to TechInfo
          </h1>
          <nav className="text-center sm:text-right">
            {isLoggedIn ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={toggleSort}
              >
                {sortByLikes ? "Sort by Date" : "Sort by Likes"}
              </button>
            ) : (
              <p className="text-gray-400">
                To access all functionalities, please log in (demo available)
              </p>
            )}
          </nav>
        </div>
        <div className="flex flex-col">
          {blogs.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Top Blogs</h2>
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-3/4 mb-4 sm:mb-0">
                      <Link to={`/post/${blog._id}`}>
                        <h3 className="text-xl font-bold hover:text-blue-500 transition-colors duration-300">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mt-2">
                        {getFirstLine(blog.content)}
                      </p>
                      <div className="text-gray-400 mt-4 flex justify-between">
                        <p>
                          By:{" "}
                          {blog.createdBy ? blog.createdBy.username : "Unknown"}
                        </p>
                        <p>Posted On: {formatPostDate(blog.createdAt)}</p>
                      </div>
                      <div className="text-gray-400 mt-2 flex justify-between">
                        <p>Likes: {blog.likesCount}</p>
                        <p>Comments: {blog.comments.length}</p>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/4 h-auto flex justify-center items-center">
                      <img
                        src={blog.imageUrl}
                        alt="Blog"
                        className="h-48 object-cover rounded-lg p-2"
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

export default Home;
