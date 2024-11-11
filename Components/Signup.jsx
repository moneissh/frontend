import  { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="image-side" style={{ backgroundImage: 'url("data:image/png;base64,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")' }}>
        {/* Dynamically set the background image */}
      </div>
      <div className="form-side">
        <div className="signup-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Signup</button>
          </form>
          {message && <p className="message">{message}</p>} {/* Display message */}

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
