import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('guest');
  const [blogs, setBlogs] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(true);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem('username') || 'guest');
      }
    };

    const fetchBlogs = async () => {
      const url = sortByLikes
        ? 'http://localhost:3001/blogs/posts'
        : 'http://localhost:3001/blogs/posts/bydate';

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/auth/userid', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { userId } = await response.json();
          setUserId(userId);
        } else {
          console.error('Error fetching user ID:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    checkLoginStatus();
    fetchBlogs();
    fetchUserId();
  }, [sortByLikes]);

  const toggleSort = () => {
    setSortByLikes((prevState) => !prevState);
  };

  const handleCreatePost = () => {
    navigate('/createpost');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Authentication</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Welcome to the Homepage</h1>
        <nav>
          {isLoggedIn ? (
            <>
              <p>You are logged in as {username}</p>
              <button onClick={handleCreatePost}>Create a Post</button>
              {userId && <button onClick={handleProfileClick}>My Profile</button>}
            </>
          ) : (
            <p>You are logged in as guest</p>
          )}
          <button onClick={toggleSort}>
            {sortByLikes ? 'Sort by Date' : 'Sort by Likes'}
          </button>
        </nav>
      </div>
      <div>
        {blogs.length > 0 ? (
          <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
              <div key={blog._id}>
                <Link to={`/post/${blog._id}`}>
                  <h3>{blog.title}</h3>
                </Link>
                <p>{blog.content}</p>
                <p>Likes: {blog.likes.length}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
