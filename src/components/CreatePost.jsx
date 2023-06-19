import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/blogs/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags, imageUrl }),
      });

      if (response.ok) {
        setSuccessMessage('Post successfully created!');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Create post error:', error);
      setError('An error occurred while creating the post.');
      setSuccessMessage('');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Create a Post</h1>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={handleContentChange} />
        </div>
        <div>
          <label>Tags:</label>
          <input type="text" value={tags} onChange={handleTagsChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <button onClick={handleGoHome}>Go to Home</button>
    </div>
  );
};

export default CreatePost;
