import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the authorization token from localStorage or wherever it's stored
        const response = await fetch(`http://localhost:3001/auth/allinfobyuid/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the authorization token in the request headers
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Render loading state while fetching user data
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile: {userId}</h1>
      {/* Display user profile data */}
      <img src={user.imageUrl} alt="ProfilePic" />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Friends: {user.friends.join(', ')}</p>
      <p>Saved Blogs: {user.savedBlogs.length}</p>
      <p>My Posts: {user.myPosts.length}</p>
      <p>Created At: {user.createdAt}</p>
    </div>
  );
}

export default ProfilePage;
