import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogs/post/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          fetchLoggedInUserId(postData); // Fetch and set the logged-in user's ID
        } else {
          console.error('Error fetching post:', response.status);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  

  const fetchLoggedInUserId = async (postData) => {
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
        setIsLiked(postData.likes.includes(userId)); // Check if the logged-in user has liked the post
      } else {
        console.error('Error fetching logged-in user ID:', response.status);
      }
    } catch (error) {
      console.error('Error fetching logged-in user ID:', error);
    }
  };

  const likePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/blogs/posts/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const updatedPostData = await response.json();
        setPost(prevPost => ({
          ...prevPost,
          likes: updatedPostData.likes // Update only the likes field
        }));
        setIsLiked(!isLiked); // Toggle the isLiked state
      } else {
        console.error('Error liking post:', response.status);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  

  const handleLike = async () => {
    await likePost(); // Call the likePost function to update the backend

    // Refresh the page
    // window.location.reload();
  };

  if (!post) {
    return <p>Loading post details...</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.content}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <p>Likes: {post.likes.length}</p>
      <p>Created By: {post.createdBy ? post.createdBy.username : 'Unknown'}</p>
      <p>Created At: {post.createdAt}</p>

      <button onClick={handleLike}>{isLiked ? 'Liked' : 'Like'}</button>

      <h3>Comments</h3>
      {post.comments.length > 0 ? (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment._id}>
              {comment.content} - {comment.userId ? comment.userId.username : 'Unknown'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default PostDetails;
