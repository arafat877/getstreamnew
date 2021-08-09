import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [image, setImage] = useState('');

    const login = () => {
        axios.post('http://localhost:5000/auth/login', { userId, username: userId, password })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('userId', data.user.userId)
            localStorage.setItem('password', data.user.password)
            localStorage.setItem('image', 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png')
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
      return (
        <div style={{ display: 'flex', justifyContent:"center", alignItems: 'center', flexDirection: 'column' }}>
            <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <br />
            <input placeholder="Username" value={userId} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Auth;
