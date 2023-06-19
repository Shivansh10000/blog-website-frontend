import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in local storage
        localStorage.setItem('username', data.user.username); // Store the username in local storage
        navigate('/'); // Redirect to the Home page
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => navigate('/register')}>
        Not registered yet? Click here
      </button>
    </div>
  );
};

export default AuthPage;
