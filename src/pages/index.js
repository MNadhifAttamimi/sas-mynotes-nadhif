// /pages/index.js
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const data = {
        name: name,
        username: username,
        password: password,
      };

      console.log('Name:', name);
      console.log('Username:', username);
      console.log('Password:', password);

      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json();

      if (res.ok) {
        alert('Data sudah sukses didaftarkan');
        router.push('/login');
      } else {
        console.error('Gagal melakukan permintaan:', res.status);
        alert('Data gagal didaftarkan');
      }
    } catch (error) {
      console.log('error: ', error);
      alert('Terjadi Kesalahan, harap hubungi tim support');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Home;
