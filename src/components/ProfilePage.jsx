import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3001/auth/allinfobyuid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchLoggedInUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/auth/userid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLoggedInUserId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching logged-in user ID:", error);
      }
    };

    fetchUserData();
    fetchLoggedInUserId();
  }, [userId]);

  if (!user || !loggedInUserId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-white">
          User Profile: {userId}
        </h1>
        <div className="flex items-center justify-center mb-4">
          <img
            src={user.imageUrl}
            alt="ProfilePic"
            className="rounded-full w-48 h-48"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 text-white">Username:</p>
            <p className="text-lg text-white">{user.username}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 text-white">Email:</p>
            <p className="text-lg text-white">{user.email}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 text-white">
              Saved Blogs:
            </p>
            <p className="text-lg text-white">{user.savedBlogs.length}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 text-white">My Posts:</p>
            <p className="text-lg text-white">{user.myPosts.length}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 text-white">Created At:</p>
            <p className="text-lg text-white">{user.createdAt}</p>
          </div>
          {loggedInUserId === userId && (
            <Link to={`/update-profile/${userId}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
