import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { userId } = useParams();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }

      const response = await fetch(
        `https://techinfo.onrender.com/auth/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            email,
            password,
            imageUrl,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-lg font-semibold mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-lg font-semibold mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-lg font-semibold mb-1"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
