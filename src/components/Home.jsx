import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const url = sortByLikes
        ? "http://localhost:3001/blogs/posts"
        : "http://localhost:3001/blogs/posts/bydate";

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

  const toggleSort = () => {
    setSortByLikes((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Homepage</h1>
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
        {blogs.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            {blogs.map((blog) => (
              <div key={blog._id} className="mb-4 flex">
                <div className="mr-4 w-3/4">
                  <Link to={`/post/${blog._id}`}>
                    <h3 className="text-lg font-bold hover:text-blue-500">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-700">{blog.content}</p>
                  <div className="text-gray-500 mb-2">
                    <p>
                      By: {blog.createdBy ? blog.createdBy.username : "Unknown"}
                    </p>
                    <p>
                      Posted On: {new Date(blog.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-gray-500 mb-2">
                    <p>Likes: {blog.likesCount}</p>
                    <p>Comments: {blog.comments.length}</p>
                  </div>
                </div>
                <div className="w-1/4 h-auto flex justify-center items-center">
                  <img
                    src={blog.imageUrl}
                    alt="Blog"
                    className="h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
