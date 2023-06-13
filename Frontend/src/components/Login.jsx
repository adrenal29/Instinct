import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import './css/login.css'
import { useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged In')
      navigate('/dashboard'); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <h1>Login Page</h1>
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading} className="login-button">
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
    </div>
  );
}

export default Login;