// pages/login.js
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = {
            username,
            password,
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful:', responseData);

                // Simpan token ke localStorage atau cookie jika diperlukan
                // Arahkan pengguna ke halaman catatan setelah login
                router.push('/notes/create');
            } else {
                throw new Error(`Login failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
