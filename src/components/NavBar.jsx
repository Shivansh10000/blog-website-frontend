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
                  <button
                    onClick={navigateToProfile}
                    className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                  >
                    My Profile
                  </button>
                )}
                <Link
                  to="/auth"
                  className="text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-4"
                  activeClassName="text-blue-500"
                >
                  Authentication
                </Link>
                <div className="ml-4 text-white">Logged in as {username}</div>
              </>
            ) : (
              <p className="text-white">You are logged in as guest</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
