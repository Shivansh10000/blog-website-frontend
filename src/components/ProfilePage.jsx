import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

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

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">User Profile: {userId}</h1>
      <div className="flex items-center justify-center mb-4">
        <img
          src={user.imageUrl}
          alt="ProfilePic"
          className="rounded-full w-24 h-24"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-lg font-semibold">Username:</p>
          <p className="text-lg">{user.username}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Email:</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Friends:</p>
          <p className="text-lg">{user.friends.join(", ")}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Saved Blogs:</p>
          <p className="text-lg">{user.savedBlogs.length}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">My Posts:</p>
          <p className="text-lg">{user.myPosts.length}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Created At:</p>
          <p className="text-lg">{user.createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
