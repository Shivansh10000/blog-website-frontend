import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("guest");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem("username") || "guest");
      }
    };

    const fetchUserId = async () => {
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
          setUserId(userId);
        } else {
          console.error("Error fetching user ID:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    checkLoginStatus();
    fetchUserId();
  }, []);

  const navigateToCreatePost = () => {
    navigate("/createpost");
  };

  const navigateToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const navigateToMyPosts = () => {
    navigate(`/myposts/${userId}`);
  };

  const navigateToSavedPosts = () => {
    navigate(`/savedposts/${userId}`);
  };

  const handleLogout = () => {
    // Clear the token and other user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Reset the state
    setIsLoggedIn(false);
    setUsername("guest");
    setUserId("");

    // Redirect to the homepage
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-blue-900 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white font-bold text-lg">
          <Link to="/">TechInfo</Link>
        </div>

        <div className="flex items-center">
          <ul className="flex">
            <li>
              <Link
                to="/"
                className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
              >
                Home
              </Link>
            </li>
          </ul>

          <div className="ml-auto flex items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={navigateToCreatePost}
                  className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                >
                  Create a Post
                </button>
                {userId && (
                  <>
                    <button
                      onClick={navigateToMyPosts}
                      className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                    >
                      My Posts
                    </button>
                    <button
                      onClick={navigateToSavedPosts}
                      className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                    >
                      Saved Posts
                    </button>
                    <button
                      onClick={navigateToProfile}
                      className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                    >
                      My Profile
                    </button>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                >
                  Logout
                </button>
                <div className="ml-4 text-white">Logged in as {username}</div>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                  activeClassName="text-blue-500"
                >
                  Authentication
                </Link>
                <p className="text-white ml-4">You are logged in as guest</p>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
