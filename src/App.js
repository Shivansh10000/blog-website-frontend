import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import ProfilePage from './components/ProfilePage';
import UpdatePost from './components/UpdatePost';
import NavBar from './components/NavBar';
import UpdateProfile from './components/UpdateProfile';
import MyPosts from './components/MyPosts'; // Import the MyPosts component
import SavedPosts from './components/SavedPosts'; // Import the SavedPosts component
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/updatepost/:postId" element={<UpdatePost />} />
        <Route
          path="/update-profile/:userId"
          element={<UpdateProfile />}
        />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/myposts/:userId" element={<MyPosts />} /> {/* Add the route for MyPosts */}
        <Route path="/savedposts/:userId" element={<SavedPosts />} /> {/* Add the route for SavedPosts */}
      </Routes>
    </Router>
  );
}

export default App;
