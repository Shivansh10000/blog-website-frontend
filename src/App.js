import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
