import React, { useState } from 'react';
import './css/register.css';
import firebase from 'firebase/compat/app';
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // Save user data to Firebase Realtime Database
        firebase.database().ref('users/' + user.uid).set({
          name: name,
          email: email,
          timestamp: Date.now()
        });
        console.log('User registered successfully:', user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Registration failed:', errorCode, errorMessage);
      });
  }

  return (
    <div className="registration-page">
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;